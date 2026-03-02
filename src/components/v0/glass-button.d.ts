import React from 'react';
interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
}
export declare function GlassButton({
  children,
  variant,
  className,
  ...props
}: GlassButtonProps): import('react/jsx-runtime').JSX.Element;
export {};
