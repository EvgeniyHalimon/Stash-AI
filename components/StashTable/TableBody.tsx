import { TableData, TableRow } from '..';

export const TableBody = () => {
  return (
    <tbody>
      <TableRow className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Apple MacBook Pro 17
        </th>
        <TableData className="px-6 py-4">Silver</TableData>
        <TableData className="px-6 py-4">Laptop</TableData>
        <TableData className="px-6 py-4">$2999</TableData>
        <TableData className="px-6 py-4 text-right">Edit</TableData>
      </TableRow>
    </tbody>
  );
};
