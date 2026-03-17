import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { backendConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function GET(req: NextRequest) {
  try {
    // Pass query params if needed
    const searchParams = req.nextUrl.searchParams;
    
    // Forward request to Backend
    // Uses SERVER-SIDE env var (BACKEND_URL) via backendConfig
    const response = await axiosBackendClient.get(backendConfig.endpoints.events.base, {
      params: Object.fromEntries(searchParams)
    });

    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
