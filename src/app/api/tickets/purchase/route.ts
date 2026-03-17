import { NextRequest } from 'next/server';
import { axiosBackendClient } from '@/lib/helpers/axiosClient';
import { backendConfig } from '@/lib/config/api';
import { handleApiSuccess, handleApiError } from '@/lib/helpers/apiHandler';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      // Return 401 if no token provided from client
      return handleApiError({
        response: { status: 401, data: { message: 'Unauthorized' } }
      });
    }
    
    // Forward request to Backend
    const response = await axiosBackendClient.post(
      backendConfig.endpoints.tickets.purchase,
      body,
      {
        headers: {
          'Authorization': authHeader
        }
      }
    );

    return handleApiSuccess(response.data.data);
  } catch (error) {
    return handleApiError(error);
  }
}
