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
    <div>
      <Navigation />
      <div className="ml-10">
        <AuthWrapper>{children}</AuthWrapper>
      </div>
    </div>
  );
}
