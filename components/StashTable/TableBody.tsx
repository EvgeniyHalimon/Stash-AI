import { TableData, TableRow } from '..';

export const TableBody = () => {
  return (
    <tbody>
      <TableRow className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <th
          scope="row"
          className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
        >
          Apple MacBook Pro 17
        </th>
        <TableData className="px-6 py-4">Silver</TableData>
        <TableData className="px-6 py-4">Laptop</TableData>
        <TableData className="px-6 py-4">$2999</TableData>
        <TableData className="px-6 py-4">Edit</TableData>
      </TableRow>
    </tbody>
  );
};
