import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { apiConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axiosBackendClient.post(apiConfig.endpoints.auth.login, body);
    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
