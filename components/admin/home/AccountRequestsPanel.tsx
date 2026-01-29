import Link from "next/link";
import React from "react";
import EmptyState from "./EmptyState";

type UserCard = {
  id: string;
  fullName: string;
  email: string;
};

export default function AccountRequestsPanel({ users }: { users: UserCard[] }) {
  return (
    <section className="rounded-2xl bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-dark-400">
          Account Requests
        </h3>
        <Link
          href="/admin/account-requests"
          className="text-xs font-semibold text-primary-admin hover:opacity-80"
        >
          View all
        </Link>
      </div>

      <div className="mt-4">
        {!users?.length ? (
          <EmptyState
            title="No Pending Account Requests"
            description="There are currently no account requests awaiting approval."
          />
        ) : (
          <div className="flex flex-wrap gap-4">
            {users.map((u) => (
              <div key={u.id} className="user-card">
                <div className="size-12 rounded-full bg-white flex items-center justify-center text-primary-admin font-bold">
                  {u.fullName?.[0]?.toUpperCase() ?? "U"}
                </div>
                <p className="name">{u.fullName}</p>
                <p className="email">{u.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
