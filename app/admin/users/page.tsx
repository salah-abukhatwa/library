import React from "react";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import Image from "next/image";

import AdminUsersTable, {
  AdminUserRow,
} from "@/components/admin/users/AdminUsersTable";

type Props = {
  searchParams: Promise<{ sort?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { sort: rawSort } = await searchParams;

  const sort = rawSort === "za" ? "za" : "az";
  const orderBy = sort === "za" ? desc(users.fullName) : asc(users.fullName);

  const allUsers = await db.select().from(users).orderBy(orderBy);
  const rows = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      role: users.role,
      status: users.status,
      universityId: users.universityId,
      universityCard: users.universityCard,
      createdAt: users.createdAt,
      booksBorrowed: sql<number>`count(${borrowRecords.id})`.mapWith(Number),
    })
    .from(users)
    .leftJoin(borrowRecords, eq(borrowRecords.userId, users.id))
    .groupBy(
      users.id,
      users.fullName,
      users.email,
      users.role,
      users.status,
      users.universityId,
      users.universityCard,
      users.createdAt,
    )
    .orderBy(orderBy);

  const data: AdminUserRow[] = rows.map((u) => ({
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    role: u.role ?? "USER",
    status: u.status ?? "PENDING",
    universityId: u.universityId,
    universityCard: u.universityCard,
    createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null,
    booksBorrowed: Number(u.booksBorrowed ?? 0),
  }));

  return (
    <section className="w-full rounded-2xl bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-dark-400">All Users</h2>

        {/* Sort (simple for now like Figma A-Z) */}
        <div className="flex items-center justify-between gap-3">
          {/* Sort pill (Figma style) */}
          <a
            href={`/admin/users?sort=${sort === "az" ? "za" : "az"}`}
            className="inline-flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-dark-400 shadow-sm hover:bg-slate-50"
            aria-label="Sort"
            title={sort === "az" ? "Sort Z–A" : "Sort A–Z"}
          >
            <span>{sort === "az" ? "A–Z" : "Z–A"}</span>

            {/* the icon like your screenshot */}
            <Image
              src="/icons/admin/sort.svg"
              alt="Sort"
              width={16}
              height={16}
              className="opacity-70"
            />
          </a>
        </div>
      </div>

      <div className="mt-5 w-full overflow-x-auto">
        <AdminUsersTable users={data} />
      </div>
    </section>
  );
}
