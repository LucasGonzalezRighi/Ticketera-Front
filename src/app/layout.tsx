import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { AuroraBackground } from '../components/presentation/backgrounds/AuroraBackground';
import { LayoutWrapper } from '../components/presentation/organisms/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ticketera App',
  description: 'Compra tus tickets online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="relative min-h-screen overflow-hidden bg-slate-950">
          <AuroraBackground />
          <div className="relative z-10">
            <Providers>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
