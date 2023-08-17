'use client';
import Link from 'next/link';
import { Settings, User, Grid, Calendar } from 'react-feather';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const icons = { Settings, User, Grid, Calendar }; //need to make this object because you cannot pass props from a server component to a client component, theres a network barrier. We cannot pass the icon component itself, instead we will pass a string that maps to an object of icons which tells us what icon to use
const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.link}>
      <Icon //in ideal world, we would just do something like <Link.Icon...>, but because we are passing prop from server component to client component it will not work
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          isActive && 'stroke-violet-600'
        )}
      />
    </Link>
  );
};

export default SidebarLink;
