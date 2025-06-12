import Link from 'next/link';
import { StashIcon /* ChatIcon */, LogoIcon, UserIcon } from '..';

export const Navigation = () => {
  const links = [
    { link: '/', icon: <LogoIcon /> },
    { link: '/list', icon: <StashIcon /> },
    /* { link: '/chat', icon: <ChatIcon /> }, */
    { link: '/profile', icon: <UserIcon /> },
  ];
  return (
    <nav className="navigation">
      <div className="navigation-block">
        {links.map(({ link, icon }) => (
          <Link href={link} key={link}>
            {icon}
          </Link>
        ))}
      </div>
    </nav>
  );
};
