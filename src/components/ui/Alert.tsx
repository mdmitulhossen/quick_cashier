import React from 'react';
import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
  onClose?: () => void;
}

export function Alert({ children, variant = 'info', className, onClose }: AlertProps) {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: X,
  };

  const Icon = icons[variant];

  return (
    <div
      className={clsx(
        'flex items-start space-x-3 p-4 rounded-lg border',
        {
          'bg-blue-50 border-blue-200 text-blue-800': variant === 'info',
          'bg-green-50 border-green-200 text-green-800': variant === 'success',
          'bg-yellow-50 border-yellow-200 text-yellow-800': variant === 'warning',
          'bg-red-50 border-red-200 text-red-800': variant === 'error',
        },
        className
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-3 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}