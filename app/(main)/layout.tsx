import type { Metadata } from 'next';
import { AuthWrapper, Navigation } from '@/components';

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
    <div className="flex flex-col xl:max-h-full xl:min-h-dvh xl:flex-row">
      <AuthWrapper>
        <Navigation />
        {children}
      </AuthWrapper>
    </div>
  );
}
