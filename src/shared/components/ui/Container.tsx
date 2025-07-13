import { clsx } from 'clsx';
import { ContainerProps } from '../../../features/landing/types';

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = 'xl',
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
  };

  const combinedClasses = clsx(
    'mx-auto px-4 sm:px-6 lg:px-8',
    maxWidthClasses[maxWidth],
    className
  );

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default Container; 