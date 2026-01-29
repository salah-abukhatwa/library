// app/admin/page.tsx
import { db } from "@/database/drizzle";
import { books, users, borrowRecords } from "@/database/schema";
import { desc, eq, sql } from "drizzle-orm";

import AdminStats from "@/components/admin/home/AdminStats";
import RecentBooksPanel from "@/components/admin/home/RecentBooksPanel";
import AccountRequestsPanel from "@/components/admin/home/AccountRequestsPanel";
import BorrowedBooksPanel from "@/components/admin/home/BorrowedBooksPanel";

export default async function AdminHomePage() {
  // ✅ Real SQL counts
  const [{ totalUsers }] = await db
    .select({ totalUsers: sql<number>`count(*)` })
    .from(users);

  const [{ totalBooks }] = await db
    .select({ totalBooks: sql<number>`count(*)` })
    .from(books);

  const [{ borrowedBooks }] = await db
    .select({ borrowedBooks: sql<number>`count(*)` })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"));

  // Latest BORROWED records for the panel
  const borrowRequests = await db
    .select({
      recordId: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      userId: users.id,
      userName: users.fullName,
      userEmail: users.email,
      bookId: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
    })
    .from(borrowRecords)
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.status, "BORROWED"))
    .orderBy(desc(borrowRecords.borrowDate))
    .limit(4);

  // If you want “everyone approved” for portfolio mode:
  // just remove this panel later, or keep it empty.
  const accountRequests = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
    })
    .from(users)
    .where(eq(users.status, "PENDING"))
    .orderBy(desc(users.createdAt))
    .limit(6);

  const recentBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      createdAt: books.createdAt,
    })
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(6);

  return (
    <div className="space-y-6">
      <AdminStats
        borrowedBooks={borrowedBooks ?? 0}
        totalUsers={totalUsers ?? 0}
        totalBooks={totalBooks ?? 0}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BorrowedBooksPanel items={borrowRequests as any} />
        <RecentBooksPanel books={recentBooks as any} />
      </div>

      <AccountRequestsPanel users={accountRequests as any} />
    </div>
  );
}
