'use client';

import React from 'react';
import { cn } from '../../lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
}

export function GlassButton({
  children,
  variant,
  className,
  ...props
}: GlassButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      className={cn(
        'group relative flex min-w-[180px] items-center justify-center gap-3 overflow-hidden rounded-lg px-8 py-4 font-medieval text-lg tracking-wider transition-all duration-300 sm:min-w-[200px] sm:px-10 sm:py-4 sm:text-xl',
        'backdrop-blur-xl border disabled:opacity-50 disabled:cursor-not-allowed',
        isPrimary
          ? 'border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f5e6c8] hover:border-[#d4af37]/70 hover:bg-[#d4af37]/20 hover:text-[#fff8e7] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]'
          : 'border-[#f5e6c8]/20 bg-[#f5e6c8]/5 text-[#c4b08a] hover:border-[#f5e6c8]/40 hover:bg-[#f5e6c8]/10 hover:text-[#f5e6c8] hover:shadow-[0_0_30px_rgba(245,230,200,0.15)]',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'absolute inset-0 -translate-x-full skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full',
          isPrimary
            ? 'bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#f5e6c8]/10 to-transparent',
        )}
      />

      <span
        className={cn(
          'absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          isPrimary
            ? 'bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#f5e6c8]/30 to-transparent',
        )}
      />

      <span className="relative z-10 flex items-center justify-center gap-3 w-full">
        {children}
      </span>
    </button>
  );
}
