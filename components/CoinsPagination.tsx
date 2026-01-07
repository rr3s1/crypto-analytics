"use client";
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { buildPageNumbers, cn, ELLIPSIS } from '@/lib/utils';

const CoinsPagination = ({ currentPage, totalPages, hasMorePages }: Pagination) => {
  const router = useRouter();

  // Updates URL to trigger server-side fetch for the new page
  const handlePageChange = (page: number) => {
    router.push(`/coins?page=${page}`);
  };

  // Utility to generate array of page numbers and ellipses
  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  // Logic to determine if the "Next" button should be disabled
  const isLastPage = !hasMorePages || currentPage === totalPages;

  return (
    <Pagination id="coins-pagination">
      <PaginationContent className="pagination-content">
        {/* Previous Button: Disabled on page 1 */}
        <PaginationItem className="pagination-control prev">
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? 'control-disabled' : 'control-button'}
          />
        </PaginationItem>

        <div className="pagination-pages">
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === ELLIPSIS ? (
                <span className="ellipsis">...</span>
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  className={cn('page-link', {
                    'page-link-active': currentPage === page,
                  })}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        {/* Next Button: Disabled if on last estimated page */}
        <PaginationItem className="pagination-control next">
          <PaginationNext
            onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
            className={isLastPage ? 'control-disabled' : 'control-button'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default CoinsPagination;
