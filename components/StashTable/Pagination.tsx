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
    <nav aria-label="Pagination" className="pagination-wrapper">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChangePage(1)}
        className={`pagination-button rounded-l-md ${page === 1 ? 'pagination-disabled' : ''}`}
      >
        <ChevronLeftFirstIcon />
      </button>

      <button
        type="button"
        disabled={page === 1}
        onClick={onPrevPage}
        className={`pagination-button ${page === 1 ? 'pagination-disabled' : ''}`}
      >
        <ChevronLeftIcon />
      </button>

      {relevantPages.map(pageNum => (
        <button
          key={pageNum}
          type="button"
          aria-current={page === pageNum ? 'page' : undefined}
          onClick={() => onChangePage(pageNum)}
          className={`pagination-page-number ${page === pageNum ? 'pagination-page-active' : 'pagination-page'}`}
        >
          {pageNum}
        </button>
      ))}

      <button
        type="button"
        disabled={page === count}
        onClick={onNextPage}
        className={`pagination-button ${page === count ? 'pagination-disabled' : ''}`}
      >
        <ChevronRightIcon />
      </button>

      <button
        type="button"
        disabled={page === count}
        onClick={() => onChangePage(count)}
        className={`pagination-button rounded-r-md ${page === count ? 'pagination-disabled' : ''}`}
      >
        <ChevronRightFirstIcon />
      </button>
    </nav>
  );
};

export default Pagination;
