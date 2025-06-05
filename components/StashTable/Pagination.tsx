'use client';

import { useState, useEffect } from 'react';
import {
  ChevronLeftFirstIcon,
  ChevronLeftIcon,
  ChevronRightFirstIcon,
  ChevronRightIcon,
} from '../Icons';

interface PaginationProps {
  page: number;
  count: number;
  onChangePage: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  onChangePage,
  onPrevPage,
  onNextPage,
}) => {
  const [relevantPages, setRelevantPages] = useState<number[]>([]);

  const getRelevantPages = () => {
    if (count <= 3) {
      setRelevantPages(Array.from({ length: count }, (_, i) => i + 1));
    } else if (page >= count - 2) {
      setRelevantPages([count - 2, count - 1, count]);
    } else if (page <= 2) {
      setRelevantPages([1, 2, 3]);
    } else {
      setRelevantPages([page - 1, page, page + 1]);
    }
  };

  useEffect(() => {
    getRelevantPages();
  }, [page, count]);

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center -space-x-px rounded-md bg-black text-amber-500 shadow-sm"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChangePage(1)}
        className={`inline-flex cursor-pointer items-center rounded-l-md border border-amber-500 px-2 py-2 text-sm font-semibold transition-all duration-500 ${page === 1 ? 'opacity-50' : 'hover:bg-amber-500 hover:text-black'} `}
      >
        <ChevronLeftFirstIcon />
      </button>

      <button
        type="button"
        disabled={page === 1}
        onClick={onPrevPage}
        className={`inline-flex cursor-pointer items-center border border-amber-500 px-2 py-2 text-sm font-semibold transition-all duration-500 ${page === 1 ? 'opacity-50' : 'hover:bg-amber-500 hover:text-black'} `}
      >
        <ChevronLeftIcon />
      </button>

      {relevantPages.map(pageNum => (
        <button
          key={pageNum}
          type="button"
          aria-current={page === pageNum ? 'page' : undefined}
          onClick={() => onChangePage(pageNum)}
          className={`inline-flex cursor-pointer items-center border border-amber-500 px-4 py-2 text-sm font-semibold text-black transition-all duration-500 hover:bg-amber-500 ${page === pageNum ? 'bg-amber-500' : 'bg-amber-700'} `}
        >
          {pageNum}
        </button>
      ))}

      <button
        type="button"
        disabled={page === count}
        onClick={onNextPage}
        className={`inline-flex cursor-pointer items-center border border-amber-500 px-2 py-2 text-sm font-semibold transition-all duration-500 ${page === count ? 'opacity-50' : 'hover:bg-amber-500 hover:text-black'} `}
      >
        <ChevronRightIcon />
      </button>

      <button
        type="button"
        disabled={page === count}
        onClick={() => onChangePage(count)}
        className={`inline-flex cursor-pointer items-center rounded-r-md border border-amber-500 px-2 py-2 text-sm font-semibold transition-all duration-500 ${page === count ? 'opacity-50' : 'hover:bg-amber-500 hover:text-black'} `}
      >
        <ChevronRightFirstIcon />
      </button>
    </nav>
  );
};

export default Pagination;
