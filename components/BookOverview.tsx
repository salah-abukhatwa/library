import Image from "next/image";
import React from "react";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : user.status !== "APPROVED"
          ? "User is not approved"
          : null,
  };

  return (
    <section
      className="
        book-overview
        flex flex-col gap-10
        md:flex-row md:items-start md:gap-12
      "
    >
      {/* Cover first on mobile */}
      <div className="order-1 flex flex-1 justify-center md:order-2 md:justify-end">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          {/* Second cover only on md+ */}
          <div className="absolute left-14 top-10 rotate-12 opacity-40 hidden md:block">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>

      {/* Text/content */}
      <div className="order-2 flex flex-1 flex-col gap-5 md:order-1">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-light-100 sm:text-4xl">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-light-200 sm:text-base">
          <p>
            By <span className="font-semibold text-light-100">{author}</span>
          </p>

          <p>
            Category{" "}
            <span className="font-semibold text-light-100">{genre}</span>
          </p>

          <div className="flex items-center gap-1">
            <Image src="/icons/star.svg" alt="star" width={18} height={18} />
            <p className="text-light-100">{rating}</p>
          </div>
        </div>

        {/* Copies */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-light-200 sm:text-base">
          <p>
            Total Books:{" "}
            <span className="font-semibold text-light-100">{totalCopies}</span>
          </p>
          <p>
            Available Books:{" "}
            <span className="font-semibold text-light-100">
              {availableCopies}
            </span>
          </p>
        </div>

        {/* Description */}
        <p className="book-description text-sm leading-relaxed text-light-200 sm:text-base">
          {description}
        </p>

        {/* CTA */}
        {user && (
          <div className="pt-2">
            <BorrowBook
              bookId={id}
              userId={userId}
              borrowingEligibility={borrowingEligibility}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookOverview;
