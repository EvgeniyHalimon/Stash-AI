import type { Metadata } from 'next';
import { Navigation } from '@/components';

export const metadata: Metadata = {
  title: 'Assistant',
  description: 'Assistant',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col xl:h-dvh xl:flex-row">
      <Navigation />
      {children}
    </div>
  );
}
