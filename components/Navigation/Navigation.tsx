import Link from 'next/link';
import { StashIcon, ChatIcon, CalendarIcon } from '..';

export const Navigation = () => {
  const links = [
    { link: '/list', icon: <StashIcon /> },
    { link: '/chat', icon: <ChatIcon /> },
    { link: '/calendar', icon: <CalendarIcon /> },
  ];
  return (
    <nav className="h-full bg-slate-900 flex flex-col px-4 py-2">
      <div className="flex xl:flex-col flex-row  gap-2">
        {links.map(({ link, icon }) => (
          <Link href={link} key={link} className="capitalize">
            {icon}
          </Link>
        ))}
      </div>
    </nav>
  );
};
