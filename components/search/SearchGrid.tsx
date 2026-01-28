import BookCard from "@/components/BookCard";
import SearchPagination from "./SearchPagination";

export default function SearchGrid({
  books,
  totalPages,
  currentPage,
  total,
}: {
  books: Book[];
  totalPages: number;
  currentPage: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl px-2 pb-6 pt-4 sm:px-4 md:p-6">
      <div
        className="
           grid grid-cols-2 justify-items-center
    gap-x-8 gap-y-14
    sm:gap-x-12 sm:gap-y-16
    md:grid-cols-5 md:justify-items-start md:gap-x-8 md:gap-y-16
        "
      >
        {books.map((b) => (
          <BookCard key={b.id} {...b} />
        ))}
      </div>

      {/* keep your footer/pagination here */}
    </div>
  );
}
