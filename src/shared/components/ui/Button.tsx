import Link from 'next/link';
import { clsx } from 'clsx';
import { ButtonProps } from '../../../features/landing/types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-[#041E42] text-white hover:bg-[#002d72] focus:ring-[#0C52E6] active:bg-[#002d72]',
    secondary: 'bg-[#0C52E6] text-white hover:bg-[#041E42] focus:ring-[#041E42] active:bg-[#041E42]',
    outline: 'border-2 border-[#041E42] text-[#041E42] hover:bg-[#041E42] hover:text-white focus:ring-[#041E42] active:bg-[#041E42] active:text-white',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const combinedClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 