import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { apiConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const response = await axiosBackendClient.get(apiConfig.endpoints.events.detail(id));
    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
