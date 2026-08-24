'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  href,
  className,
  variant = 'primary',
  onClick,
}: Props) {
  const cls = clsx(
    'btn',
    variant === 'primary' ? 'btn-primary' : 'btn-ghost',
    className
  );

  const inner = (
    <>
      {children}
      <span className="arrow inline-block" aria-hidden>↗</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
