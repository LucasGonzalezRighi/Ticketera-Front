import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { apiConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization');
    const response = await axiosBackendClient.get(apiConfig.endpoints.tickets.myTickets, {
      headers: { Authorization: token || '' }
    });
    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
