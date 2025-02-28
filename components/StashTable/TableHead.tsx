import { ChevronIcon, TableHeader, TableRow } from '..';

export const TableHead = () => {
  const tableHead = ['Product name', 'Color', 'Category', 'Price'];
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <TableRow>
        {tableHead.map(title => (
          <TableHeader scope="col" className="px-6 py-3" key={title}>
            {title}
            <ChevronIcon />
          </TableHeader>
        ))}
        <TableHeader scope="col" className="px-6 py-3">
          Edit
        </TableHeader>
      </TableRow>
    </thead>
  );
};
