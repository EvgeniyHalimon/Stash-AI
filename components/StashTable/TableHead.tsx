import { SortType } from '@/shared';
import { ChevronIcon, TableHeader, TableRow } from '..';

export const TableHead = ({
  sort,
  sortBy,
  setSort,
  setSortBy,
}: {
  sort: SortType;
  sortBy: string;
  setSort: (value: SortType) => void;
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
    <thead className="table-head">
      <TableRow>
        {tableHead.map(({ title, label }) => (
          <TableHeader scope="col" className="table-head-cell" key={title}>
            <div className="flex items-center gap-1">
              {label}
              <button
                onClick={() => {
                  setSortBy(title);
                  setSort(sort === 'asc' ? 'desc' : 'asc');
                }}
                className={`table-sort-button ${
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
