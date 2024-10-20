import React from 'react';
import { Pagination, Button } from '@nextui-org/react';

interface BookingPaginationProps {
  page: number;
  pages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  setPage: (page: number) => void;
}

const TransactionPagination: React.FC<BookingPaginationProps> = ({
  page,
  pages,
  onPreviousPage,
  onNextPage,
  setPage,
}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Trước
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Sau
        </Button>
      </div>
    </div>
  );
};

export default TransactionPagination;
