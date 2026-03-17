// file: front-end/src/components/organisms/ValidatePanel.tsx
import React, { useState } from 'react';
import { useValidateTicket } from '../../../hooks/useValidateTicket';
import { Button } from '../../ui/atoms/Button';
import { TextField } from '../../ui/atoms/TextField';
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { formatDate } from '../../../utils/formatDate';

export const ValidatePanel: React.FC = () => {
  const { validate, result, isLoading, error, reset } = useValidateTicket();
  const [code, setCode] = useState('');

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    try {
      await validate(code);
    } catch {
      // Error is handled by hook state
    }
  };

  const handleReset = () => {
    reset();
    setCode('');
  };

  // Determine status color: Green (valid), Red (error), Yellow (loading)
  // We use isLoading for Yellow, result.valid for Green, and error for Red.
  
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center border-t-8 border-yellow-400">
        <Loader2 className="w-16 h-16 text-yellow-500 mx-auto animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Validando Ticket...</h2>
        <p className="text-gray-500 mt-2">Por favor espere</p>
      </div>
    );
  }

  if (result?.valid) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center border-t-8 border-green-500 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-green-700 mb-2">Ticket Válido</h2>
        <p className="text-gray-500 mb-6">Acceso autorizado</p>
        
        <div className="bg-gray-50 p-4 rounded-lg text-left space-y-3 mb-6 border border-gray-100">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Evento</span>
            <p className="font-medium text-gray-900">{result.event?.title || 'Evento desconocido'}</p>
            <p className="text-sm text-gray-600">{result.event?.venue} - {result.event?.date ? formatDate(result.event.date) : ''}</p>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Asistente</span>
            <p className="font-medium text-gray-900">{result.owner?.name || 'Nombre no disponible'}</p>
            <p className="text-sm text-gray-600">{result.owner?.email}</p>
          </div>
          <div className="border-t border-gray-200 pt-2">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Validado</span>
             <p className="text-sm text-gray-600">{result.validatedAt ? formatDate(result.validatedAt) : 'Recién'}</p>
          </div>
        </div>

        <Button onClick={handleReset} className="w-full bg-green-600 hover:bg-green-700">
          Escanear Siguiente
        </Button>
      </div>
    );
  }

  if (error) {
    const isUsed = error.toLowerCase().includes('usado') || error.toLowerCase().includes('used');
    return (
      <div className={`max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center border-t-8 ${isUsed ? 'border-orange-500' : 'border-red-500'} animate-in fade-in slide-in-from-bottom-4 duration-300`}>
        {isUsed ? (
            <AlertTriangle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
        ) : (
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
        )}
        
        <h2 className={`text-3xl font-bold mb-2 ${isUsed ? 'text-orange-700' : 'text-red-700'}`}>
            {isUsed ? 'Ticket Ya Usado' : 'Ticket Inválido'}
        </h2>
        <div className={`p-4 rounded-lg mb-6 ${isUsed ? 'bg-orange-50 text-orange-800' : 'bg-red-50 text-red-800'}`}>
            {error}
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full">
          Intentar Nuevamente
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border-t-8 border-blue-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Validar Acceso</h2>
      <form onSubmit={handleValidate} className="space-y-6">
        <TextField
          id="ticketCode"
          label="Código del Ticket"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingrese UUID del ticket..."
          required
          className="text-lg"
        />
        <Button type="submit" className="w-full text-lg py-3">
          Validar Ticket
        </Button>
      </form>
    </div>
  );
};
