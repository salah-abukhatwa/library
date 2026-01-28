"use client";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const go = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete("page");
    else params.set("page", String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  if (totalPages <= 1) return null;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const baseBtn =
    "h-8 w-8 rounded-md px-0 text-sm font-medium transition-colors " +
    "bg-[#232839] text-light-100 hover:bg-light-300/80 ";

  const activeBtn = "bg-primary text-dark-100 hover:bg-primary";

  const iconBtn =
    "h-8 w-8 rounded-md grid place-items-center transition-colors " +
    "bg-[#232839] text-light-100 hover:bg-[#2b3147]";

  return (
    <Pagination>
      <PaginationContent className="gap-2">
        {/* Prev icon-only */}
        <PaginationItem>
          <button
            type="button"
            onClick={() => !prevDisabled && go(currentPage - 1)}
            disabled={prevDisabled}
            className={cn(
              iconBtn,
              prevDisabled && "opacity-50 cursor-not-allowed",
            )}
            aria-label="Previous page"
          >
            ‹
          </button>
        </PaginationItem>

        {/* Page 1 */}
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              go(1);
            }}
            className={cn(baseBtn, currentPage === 1 && activeBtn)}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis */}
        {totalPages > 3 && currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis className="text-light-200" />
          </PaginationItem>
        )}

        {/* Middle current page (only when it's not 1 or last) */}
        {currentPage !== 1 && currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              onClick={(e) => e.preventDefault()}
              className={cn(baseBtn, activeBtn)}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Right ellipsis */}
        {totalPages > 3 && currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis className="text-light-200" />
          </PaginationItem>
        )}

        {/* Last page */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={currentPage === totalPages}
              onClick={(e) => {
                e.preventDefault();
                go(totalPages);
              }}
              className={cn(baseBtn, currentPage === totalPages && activeBtn)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next icon-only */}
        <PaginationItem>
          <button
            type="button"
            onClick={() => !nextDisabled && go(currentPage + 1)}
            disabled={nextDisabled}
            className={cn(
              iconBtn,
              nextDisabled && "opacity-50 cursor-not-allowed",
            )}
            aria-label="Next page"
          >
            ›
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
