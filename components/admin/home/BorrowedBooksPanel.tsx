// components/admin/home/BorrowedBooksPanel.tsx
import Link from "next/link";
import React from "react";
import EmptyState from "./EmptyState";
import BookStripe from "./BookStripe";

type BorrowedItem = {
  recordId: string;
  borrowDate: string | Date;
  dueDate: string | Date;

  userName: string;
  userEmail: string;

  bookId: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  coverColor: string;
};

export default function BorrowedBooksPanel({
  items,
}: {
  items: BorrowedItem[];
}) {
  return (
    <section className="rounded-2xl bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-dark-400">
          Borrowed Books
        </h3>

        <Link
          href="/admin/book-requests"
          className="text-xs font-semibold text-primary-admin hover:opacity-80"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {!items?.length ? (
          <EmptyState
            title="No borrowed books right now"
            description="When users borrow books, they’ll appear here."
          />
        ) : (
          items.map((item) => (
            <BookStripe key={item.recordId} item={item} showEye />
          ))
        )}
      </div>
    </section>
  );
}
