import Link from "next/link";
import React from "react";
import BookStripe from "./BookStripe";

type RecentBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  coverColor: string;
};

export default function RecentBooksPanel({ books }: { books: RecentBook[] }) {
  return (
    <section className="rounded-2xl bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-dark-400">
          Recently Added Books
        </h3>
        <Link
          href="/admin/books"
          className="text-xs font-semibold text-primary-admin hover:opacity-80"
        >
          View all
        </Link>
      </div>

      <Link href="/admin/books/new" className="add-new-book_btn">
        <div>
          <span className="text-xl font-bold text-primary-admin">+</span>
        </div>
        <div>
          <p>Add New Book</p>
          <p className="text-sm text-light-500">Create a new book record</p>
        </div>
      </Link>

      <div className="space-y-3">
        {books?.map((b) => (
          <BookStripe
            key={b.id}
            item={{
              title: b.title,
              author: b.author,
              genre: b.genre,
              coverUrl: b.coverUrl,
              coverColor: b.coverColor,
            }}
          />
        ))}
      </div>
    </section>
  );
}
