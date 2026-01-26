'use client';

import React from 'react';
import { ValidatePanel } from '../../components/presentation/organisms/ValidatePanel';

import { ProtectedRoute } from '../../components/presentation/layout/ProtectedRoute';

export default function ValidatePage() {
  return (
    <ProtectedRoute>
      <div className="py-12">
        <ValidatePanel />
      </div>
    </ProtectedRoute>
  );
}
