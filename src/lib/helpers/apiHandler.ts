import { NextResponse } from 'next/server';
import axios from 'axios';

export function handleApiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function handleApiError(error: unknown) {
  console.error('[API_ERROR]', error);

  let status = 500;
  let message = 'Error interno del servidor';
  let code = 'INTERNAL_SERVER_ERROR';

  if (axios.isAxiosError(error)) {
    // Si el error viene del backend (axios response)
    if (error.response) {
      status = error.response.status;
      message = error.response.data?.message || error.message;
      code = error.response.data?.code || `BACKEND_${status}`;

      // Manejo específico de códigos HTTP
      if (status === 404) {
        status = 502;
        message = 'Ruta de backend no encontrada (revisar endpoints)';
        code = 'BAD_GATEWAY';
      } else if (status === 401) {
        status = 401;
        message = 'Credenciales incorrectas';
        code = 'UNAUTHORIZED';
      }
    } else if (error.request) {
      // Errores de conexión (ECONNREFUSED, ENOTFOUND, timeout)
      status = 503;
      message = 'Backend no disponible';
      code = 'SERVICE_UNAVAILABLE';
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json(
    {
      success: false,
      message,
      code,
    },
    { status }
  );
}
