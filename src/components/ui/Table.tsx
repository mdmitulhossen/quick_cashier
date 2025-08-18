import React from 'react';
import { clsx } from 'clsx';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={clsx('w-full', className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <thead className={clsx('bg-gray-50', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <tbody className={clsx(className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <tr className={clsx('border-b border-gray-200 hover:bg-gray-50', className)}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={clsx('text-left py-3 px-4 font-medium text-gray-900', className)}>
      {children}
    </th>
  );
}

export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={clsx('py-4 px-4', className)}>
      {children}
    </td>
  );
}