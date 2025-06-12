'use client';
import { AuthWrapper, Navigation } from '@/components';
import CalendarContext from '@/components/Calendar/CalendarContext';
import { useCalendarContext } from '@/shared';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const calendarContext = useCalendarContext();
  return (
    <div>
      <CalendarContext.Provider value={calendarContext}>
        <Navigation />
        <div className="dashboard-layout-section">
          <AuthWrapper>{children}</AuthWrapper>
        </div>
      </CalendarContext.Provider>
    </div>
  );
}
