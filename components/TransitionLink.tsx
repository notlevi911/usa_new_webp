'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent, Ref } from 'react';
import { useCurtainNavigate } from '@/context/CurtainContext';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
};

export default function TransitionLink({ href, onClick, children, ref, ...rest }: Props) {
  const navigate = useCurtainNavigate();

  return (
    <Link
      ref={ref}
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
