import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/forms/BookForm";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, params.id))
    .limit(1)
    .then((res) => res[0]);

  if (!book) return notFound();

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" book={book as any} />
      </section>
    </>
  );
}
