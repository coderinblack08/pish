import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const ButtonStyles = {
  sm: 'px-5 py-2 rounded shadow',
  md: 'px-8 py-2.5 rounded-md shadow-md',
  lg: 'px-10 py-5 rounded-lg shadow-lg text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  size = 'sm',
}) => {
  const button = (
    <button
      className={`transition ease duration-200 focus:ring-2 ring-red-500 font-serif font-medium focus:outline-none focus:border focus:border-red-200 bg-red-600 focus:bg-red-700 text-red-50 ${
        ButtonStyles[size.toString()]
      }`}
    >
      {children}
    </button>
  );
  if (href) {
    return <Link href={href}>{button}</Link>;
  }
  return button;
};
