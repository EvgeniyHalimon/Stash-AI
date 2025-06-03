import { ChevronIcon, TableHeader, TableRow } from '..';

export const TableHead = () => {
  const tableHead = ['Product name', 'Color', 'Category', 'Price'];
  return (
    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <TableRow>
        {tableHead.map(title => (
          <TableHeader scope="col" className="px-6 py-3" key={title}>
            <div className="flex items-center gap-1">
              {title}
              <ChevronIcon />
            </div>
          </TableHeader>
        ))}
        <TableHeader scope="col" className="px-6 py-3">
          Edit
        </TableHeader>
      </TableRow>
    </thead>
  );
};
