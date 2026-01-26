import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { apiConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization');
    const body = await req.json();
    const response = await axiosBackendClient.post(apiConfig.endpoints.tickets.purchase, body, {
      headers: { Authorization: token || '' }
    });
    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
