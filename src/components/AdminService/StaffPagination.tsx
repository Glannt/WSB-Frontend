import { Pagination, Button } from '@nextui-org/react';

interface RoomPaginationProps {
  page: number;
  pages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onChange: (page: number) => void;
}

const StaffPagination: React.FC<RoomPaginationProps> = ({
  page,
  pages,
  onPreviousPage,
  onNextPage,
  onChange,
}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        isCompact
        showControls
        page={page}
        total={pages}
        onChange={onChange}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={pages === 1} size="sm" onPress={onPreviousPage}>
          Previous
        </Button>
        <Button isDisabled={pages === 1} size="sm" onPress={onNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StaffPagination;
