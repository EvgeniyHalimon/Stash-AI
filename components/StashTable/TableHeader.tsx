import { ThHTMLAttributes, ReactNode } from 'react';

interface ITableHeader extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const TableHeader = ({ children, ...rest }: ITableHeader) => {
  return <th {...rest}>{children}</th>;
};
