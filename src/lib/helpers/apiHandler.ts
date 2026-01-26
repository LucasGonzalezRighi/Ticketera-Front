import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

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
    } else if (error.request) {
      // Si no hubo respuesta del backend
      status = 503;
      message = 'No se pudo contactar con el servidor backend';
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
