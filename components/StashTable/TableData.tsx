import { TdHTMLAttributes, ReactNode } from 'react';

interface ITableData extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const TableData = ({ children, ...rest }: ITableData) => {
  return <td {...rest}>{children}</td>;
};
