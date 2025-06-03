import Link from 'next/link';
import { StashIcon, ChatIcon, CalendarIcon, LogoIcon } from '..';

export const Navigation = () => {
  const links = [
    { link: '/', icon: <LogoIcon /> },
    { link: '/list', icon: <StashIcon /> },
    { link: '/chat', icon: <ChatIcon /> },
    { link: '/calendar', icon: <CalendarIcon /> },
  ];
  return (
    <nav className="flex h-full flex-col bg-slate-900 px-4 py-2">
      <div className="flex flex-row gap-2 xl:flex-col">
        {links.map(({ link, icon }) => (
          <Link href={link} key={link} className="capitalize">
            {icon}
          </Link>
        ))}
      </div>
    </nav>
  );
};
