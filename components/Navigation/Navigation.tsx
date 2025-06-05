import Link from 'next/link';
import { StashIcon, ChatIcon, CalendarIcon, LogoIcon, UserIcon } from '..';

export const Navigation = () => {
  const links = [
    { link: '/', icon: <LogoIcon /> },
    { link: '/list', icon: <StashIcon /> },
    { link: '/chat', icon: <ChatIcon /> },
    { link: '/calendar', icon: <CalendarIcon /> },
    { link: '/profile', icon: <UserIcon /> },
  ];
  return (
    <nav className="flex h-auto flex-col bg-slate-900 p-4">
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
