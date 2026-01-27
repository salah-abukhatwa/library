"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const qFromUrl = searchParams.get("q") ?? "";
  const [q, setQ] = useState(qFromUrl);

  useEffect(() => setQ(qFromUrl), [qFromUrl]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    params.delete("page");

    startTransition(() => {
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    });
  };

  useEffect(() => {
    const t = setTimeout(() => setParam("q", q.trim()), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="mx-auto mt-8 w-full max-w-[560px]">
      <div className="flex h-11 w-full items-center gap-2 rounded-lg bg-dark-200 px-4">
        <span className="text-light-200">⌕</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find your next read..."
          className="h-full w-full bg-transparent text-sm text-light-100 outline-none placeholder:text-light-200"
        />
      </div>
    </div>
  );
}
