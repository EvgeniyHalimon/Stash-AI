import { HTMLAttributes, ReactNode } from 'react';

interface ITableRow extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export const TableRow = ({ children, ...rest }: ITableRow) => {
  return (
    <tr {...rest}>
      {' '}
      <>{children}</>
    </tr>
  );
};
