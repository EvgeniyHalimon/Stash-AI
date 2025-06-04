import { ChevronIcon, TableHeader, TableRow } from '..';

export const TableHead = ({
  sort,
  sortBy,
  setSort,
  setSortBy,
}: {
  sort: 'asc' | 'desc';
  sortBy: string;
  setSort: (value: 'asc' | 'desc') => void;
  setSortBy: (value: string) => void;
}) => {
  const tableHead = [
    { title: 'title', label: 'Product name' },
    { title: 'price', label: 'Price' },
    { title: 'category', label: 'Category' },
    { title: 'postponed', label: 'Postponed' },
    { title: 'remainingToBePostponed', label: 'Remains to be postponed' },
    { title: 'whenWillItEnd', label: 'End' },
  ];
  return (
    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <TableRow>
        {tableHead.map(({ title, label }) => (
          <TableHeader scope="col" className="px-4 py-3" key={title}>
            <div className="flex items-center gap-1">
              {label}
              <button
                onClick={() => {
                  setSortBy(title);
                  setSort(sort === 'asc' ? 'desc' : 'asc');
                }}
                className={`origin-center cursor-pointer transition-transform duration-300 ease-in-out will-change-transform ${
                  sortBy === title && sort === 'asc' ? 'rotate-180' : ''
                }`}
              >
                <ChevronIcon />
              </button>
            </div>
          </TableHeader>
        ))}
        <TableHeader scope="col" className="px-6 py-3">
          Edit / Delete
        </TableHeader>
      </TableRow>
    </thead>
  );
};
