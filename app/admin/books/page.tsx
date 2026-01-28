import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminBooksTable from "@/components/admin/books/AdminBooksTable";

export default async function Page() {
  const allBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>

        <Button className="bg-primary-admin hover:bg-primary-admin/90" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <AdminBooksTable books={allBooks} />
    </section>
  );
}
