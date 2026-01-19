import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import BookCover from "./BookCover";
import { tintedBg } from "@/lib/tintedBg";

export type BorrowedBook = Book & {
  borrowRecordId: string;
  borrowDate: string | Date;
  dueDate: string | Date;
  status: "BORROWED" | "RETURNED";
};

export default function BorrowedBookCard({ book }: { book: BorrowedBook }) {
  const borrowedOn = dayjs(book.borrowDate).format("MMM D");
  const daysLeft = dayjs(book.dueDate).diff(dayjs(), "day");
  const isOverdue = book.status === "BORROWED" && daysLeft < 0;

  return (
    <li className="w-[280px] rounded-2xl p-5 bg-[#12141D]">
      {/* your figma layout here */}
      <Link href={`/books/${book.id}`}>
        <div
          className="flex items-center justify-center rounded-[10px] p-5 "
          style={tintedBg(book.coverColor)}
        >
          <BookCover
            className="[filter:drop-shadow(-10px_-10px_18px_rgba(0,0,0,0.6))_drop-shadow(14px_18px_26px_rgba(0,0,0,0.2))]
    will-change-[filter]"
            coverColor={book.coverColor}
            coverImage={book.coverUrl}
            variant="medium"
          />
        </div>

        <p className="mt-4 text-xl font-semibold text-light-100">
          {book.title}
        </p>
        <p className="text-light-100/70 text-sm italic">{book.genre}</p>

        <div className="mt-5 space-y-2 text-sm text-light-100/80">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/book-white.svg"
              alt="borrow"
              width={16}
              height={16}
            />
            <span>Borrowed on {borrowedOn}</span>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={16}
              height={16}
            />
            <span className={isOverdue ? "text-red-400" : ""}>
              {isOverdue ? "Overdue Return" : `${daysLeft} days left to due`}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
