import Link from 'next/link';
import { StashIcon, ChatIcon, LogoIcon, UserIcon } from '..';

export const Navigation = () => {
  const links = [
    { link: '/', icon: <LogoIcon /> },
    { link: '/list', icon: <StashIcon /> },
    { link: '/chat', icon: <ChatIcon /> },
    { link: '/profile', icon: <UserIcon /> },
  ];
  return (
    <nav className="fixed top-0 left-0 flex h-screen w-10 flex-col bg-slate-900 p-4">
      <div className="flex flex-col items-center gap-3">
        {links.map(({ link, icon }) => (
          <Link href={link} key={link} className="capitalize">
            {icon}
          </Link>
        ))}
      </div>
    </nav>
  );
};
