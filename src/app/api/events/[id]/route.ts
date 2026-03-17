import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { backendConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Forward request to Backend
    const response = await axiosBackendClient.get(backendConfig.endpoints.events.detail(id));

    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
