import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-golden-primary text-golden-dark hover:bg-golden-light focus:ring-golden-primary font-semibold',
    secondary: 'bg-golden-brown text-golden-light hover:bg-golden-dark focus:ring-golden-brown',
    outline: 'border-2 border-golden-primary text-golden-primary hover:bg-golden-cream focus:ring-golden-primary'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  return <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} aria-label={typeof children === 'string' ? children : undefined}>
      {children}
    </button>;
}