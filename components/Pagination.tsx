import { toast } from "sonner";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}
const Pagination = ({ page, setPage, totalPages }: Props) => {
  const handlePreviousPage = () => {
    if (page === 1) {
      toast.error("There is no previous page");
      return;
    }
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === totalPages) {
      toast.error("There is no next page");
      return;
    }
    setPage(page + 1);
  };

  return (
    <div aria-label="Pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePreviousPage} />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <PaginationItem
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
            >
              <PaginationLink isActive={page === pageNumber}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};

export default Pagination;
