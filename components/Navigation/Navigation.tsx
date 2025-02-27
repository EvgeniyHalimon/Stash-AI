import { links } from '@/shared';
import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="h-full bg-slate-900 flex flex-col">
      <div className="flex flex-col gap-2">
        {Object.values(links).map(link => (
          <Link href={link} key={link} className="capitalize">
            {link.slice(1)}
          </Link>
        ))}
      </div>
      <button className="relative cursor-pointer left-[80%] h-[40px] w-[60px] bg-red-500 flex items-center justify-center top-[calc(50%-88px)]">
        {'<'}
      </button>
    </nav>
  );
};
