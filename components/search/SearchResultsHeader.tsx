"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchResultsHeader({ genres }: { genres: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const q = searchParams.get("q") ?? "";
  const department = searchParams.get("department") ?? "ALL";

  const options = useMemo(() => ["ALL", ...genres], [genres]);

  const hasQuery = Boolean(q || (department && department !== "ALL"));

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "ALL") params.delete(key);
    else params.set(key, value);

    params.delete("page");

    startTransition(() => {
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    });
  }
  return (
    <div className="relative shrink-0">
      <select
        value={department}
        onChange={(e) => setParam("department", e.target.value)}
        className="
          h-9 appearance-none rounded-lg bg-[#232839]
          pl-4 pr-10 text-xs font-medium leading-none
          text-light-100 outline-none
        "
      >
        {options.map((g) => (
          <option key={g} value={g} className="bg-[#232839]">
            {g === "ALL" ? "Filter by: Department" : g}
          </option>
        ))}
      </select>

      {/* custom arrow */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-light-200">
        ▾
      </span>
    </div>
  );
}
