import { Session } from "next-auth";
import React from "react";
import { logout } from "@/lib/actions/auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.name}
        </h2>
        <p className="text-slate-500 text-base">
          Monitor all of your projects and tasks here
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p>Search</p>

        {/* Logout (server action) */}
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md px-3 py-2 text-sm font-medium text-dark-400 hover:bg-slate-100"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
