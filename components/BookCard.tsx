import React from "react";
import BookCover from "./BookCover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link href={`/books/${id}`} className="w-full flex flex-col items-center">
        <BookCover
          coverColor={coverColor}
          coverImage={coverUrl}
          variant="medium"
        />

        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title text-center">{title}</p>
          <p className="book-genre text-center">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full flex flex-col items-center">
            <div className="book-loaned flex items-center gap-2">
              <Image
                src="/icons/calendar.svg"
                alt="calendar icon"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>

            <Button variant="ghost" className="book-btn mt-2">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
