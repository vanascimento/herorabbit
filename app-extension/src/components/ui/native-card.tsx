import { ReactNode } from 'react';

type CardProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};

export default function NativeCard({ children, title, subtitle }: CardProps) {
  return (
    <div className="ext-w-full ext-bg-secondary hover:ext-bg-secondary/75 ext-rounded-2xl ext-flex-row ext-gap-1 ext-px-6 ext-py-4">
      {title && (
        <div className="ext-flex ext-flex-col ext-gap-1">
          <p className="ext-font-semibold ext-text">{title}</p>
          {subtitle && <p className="ext-text-xs ext-py-2">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
