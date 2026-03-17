'use client';

import React from 'react';
import { AuthGuard } from '../../components/presentation/guards/AuthGuard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
