import { NextRequest, NextResponse } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { backendConfig } from '@/lib/config/api';

export async function GET(req: NextRequest) {
  try {
    // Intenta conectar con el backend (usamos /events como ping si no hay /health en backend)
    // Lo ideal sería que el backend tenga /health
    await axiosBackendClient.get(backendConfig.endpoints.events.base);
    
    return NextResponse.json({ 
      success: true, 
      message: "Backend is up", 
      data: null 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Backend unavailable", 
      data: null 
    }, { status: 503 });
  }
}
