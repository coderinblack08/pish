import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  sans?: boolean;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  colorTheme?: 'red' | 'blue' | 'lightBlue' | 'orange' | 'purple' | 'gray';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonStyles = {
  sm: 'px-5 py-2 rounded shadow',
  md: 'px-8 py-2.5 rounded-md shadow-md',
  lg: 'px-10 py-5 rounded-lg shadow-lg text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  colorTheme = 'red',
  sans = false,
  children,
  href,
  disabled,
  size = 'sm',
  ...props
}) => {
  const button = (
    <button
      className={`transition ease duration-200 focus:ring-2 ring-${colorTheme}-500 ${
        sans ? 'font-sans font-bold' : 'font-serif font-medium'
      } focus:outline-none focus:border focus:border-${colorTheme}-200 bg-${colorTheme}-600 focus:bg-${colorTheme}-700 text-${colorTheme}-50 ${
        ButtonStyles[size.toString()]
      } ${
        disabled
          ? `cursor-not-allowed bg-${colorTheme}-800 text-${colorTheme}-200`
          : `focus:border focus:border-${colorTheme}-200 bg-${colorTheme}-600 focus:bg-${colorTheme}-700 text-${colorTheme}-50`
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
  if (href) {
    return <Link href={href}>{button}</Link>;
  }
  return button;
};
