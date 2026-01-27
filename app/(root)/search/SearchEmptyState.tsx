"use client";

import { usePathname, useRouter } from "next/navigation";

export default function SearchEmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="rounded-2xl bg-dark-300/20 p-10">
      <div className="mt-10 flex flex-col items-center justify-center text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-dark-200">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <span className="text-primary">×</span>
          </div>
        </div>

        <h3 className="mt-5 text-base font-semibold text-light-100">
          No Results Found
        </h3>
        <p className="mt-2 max-w-[380px] text-xs text-light-200">
          We couldn&apos;t find any books matching your search. Try using
          different keywords or check for typos.
        </p>

        <button
          onClick={() => router.push(pathname)}
          className="mt-5 h-10 w-[240px] rounded-md bg-primary text-sm font-semibold text-dark-100"
        >
          CLEAR SEARCH
        </button>
      </div>
    </div>
  );
}
