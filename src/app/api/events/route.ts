import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { apiConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function GET(req: NextRequest) {
  try {
    // Pass query params if needed
    const searchParams = req.nextUrl.searchParams;
    const response = await axiosBackendClient.get(apiConfig.endpoints.events.base, {
      params: Object.fromEntries(searchParams)
    });
    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
