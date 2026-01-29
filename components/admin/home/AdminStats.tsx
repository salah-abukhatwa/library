import React from "react";

function StatCard({
  label,
  count,
  delta,
  deltaColor,
}: {
  label: string;
  count: number;
  delta: string;
  deltaColor: "green" | "red";
}) {
  return (
    <div className="stat">
      <div className="stat-info">
        <p className="stat-label">{label}</p>
        <p
          className={`text-xs font-semibold ${deltaColor === "green" ? "text-green-600" : "text-red-600"}`}
        >
          {delta}
        </p>
      </div>
      <p className="stat-count">{count}</p>
    </div>
  );
}

export default function AdminStats({
  borrowedBooks,
  totalUsers,
  totalBooks,
}: {
  borrowedBooks: number;
  totalUsers: number;
  totalBooks: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard
        label="Borrowed Books"
        count={borrowedBooks}
        delta="▼ 2"
        deltaColor="red"
      />
      <StatCard
        label="Total Users"
        count={totalUsers}
        delta="▲ 4"
        deltaColor="green"
      />
      <StatCard
        label="Total Books"
        count={totalBooks}
        delta="▲ 2"
        deltaColor="green"
      />
    </div>
  );
}
