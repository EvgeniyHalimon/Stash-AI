import { formatDate, IGoods } from '@/shared';
import { TableData, TableRow } from '..';

export const TableBody = ({ goods }: { goods: IGoods[] }) => {
  return (
    <tbody>
      {goods.map(
        ({
          _id,
          title,
          price,
          category,
          postponed,
          remainingToBePostponed,
          whenWillItEnd,
        }) => (
          <TableRow
            key={_id}
            className="border-b border-gray-200 bg-gray-800 transition-all duration-500 hover:bg-gray-900 dark:border-gray-700"
          >
            <th
              scope="row"
              className="px-4 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
            >
              {title}
            </th>
            <TableData className="px-4 py-4">{price}</TableData>
            <TableData className="px-4 py-4">{category}</TableData>
            <TableData className="px-4 py-4">{postponed}</TableData>
            <TableData className="px-4 py-4">
              {remainingToBePostponed}
            </TableData>
            <TableData className="px-4 py-4">
              {formatDate(whenWillItEnd)}
            </TableData>
            <TableData className="px-4 py-4">Edit / Delete</TableData>
          </TableRow>
        ),
      )}
    </tbody>
  );
};
