import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  target,
  rel,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium text-sm transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap select-none';

  let variantStyles = '';

  if (variant === 'primary') {
    // Primary: bg-[#051A24], text white, rounded-full, px-7 py-3, with complex multi-layered box-shadow
    variantStyles =
      'bg-[#051A24] text-white rounded-full px-7 py-3 shadow-btn-primary hover:bg-[#0D212C] hover:shadow-lg';
  } else if (variant === 'secondary') {
    // Secondary: bg-white, text #051A24, no border, with subtle shadow
    variantStyles =
      'bg-white text-[#051A24] rounded-full px-7 py-3 shadow-btn-secondary hover:bg-slate-50 hover:shadow-md';
  } else if (variant === 'tertiary') {
    // Tertiary: white bg with combined shadow
    variantStyles =
      'bg-white text-[#0D212C] rounded-full px-7 py-3 shadow-btn-secondary hover:bg-slate-50 border border-[#0D212C]/10 hover:border-[#0D212C]/20 shadow-[0_4px_16px_rgba(0,0,0,0.08)]';
  }

  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={combinedClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
