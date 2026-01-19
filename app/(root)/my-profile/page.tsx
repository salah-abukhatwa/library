// app/(root)/my-profile/page.tsx
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import { getBorrowedBooks } from "@/lib/actions/borrow";
import ProfileCard from "@/components/ProfileCard";
import BorrowedBookCard from "@/components/BorrowedBookCard";
import type { BorrowedBook } from "@/components/BorrowedBookCard";

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const [user] = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) redirect("/sign-in");

  const borrowed = (await getBorrowedBooks(user.id)) as BorrowedBook[];

  return (
    <section className="grid grid-cols-1 gap-10 lg:grid-cols-[566px_1fr] lg:gap-12">
      {/* Left profile card */}
      <ProfileCard
        fullName={user.fullName}
        email={user.email}
        universityId={user.universityId}
        universityCardUrl={user.universityCard}
      />

      {/* Right borrowed books */}
      <div>
        <h1 className="text-3xl font-semibold text-light-100">
          Borrowed books
        </h1>

        <ul className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2  lg:grid-cols-2 ">
          {borrowed.map((b) => (
            <BorrowedBookCard key={b.borrowRecordId} book={b} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
