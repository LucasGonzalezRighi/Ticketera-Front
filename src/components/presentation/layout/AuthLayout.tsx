import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerLinkText: string;
  footerLinkHref: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footerLinkText,
  footerLinkHref,
}) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Aurora Background is handled in RootLayout */}
      
      {/* Glass Card */}
      <Card className="w-full max-w-md glass-panel shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500 border-white/10">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-400 text-base">
            {subtitle}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {children}
        </CardContent>
        
        <CardFooter className="justify-center pt-2 pb-6">
          <Link 
            href={footerLinkHref}
            className="text-sm text-slate-400 hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            {footerLinkText}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
