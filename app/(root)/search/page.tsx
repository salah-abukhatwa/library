import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import SearchToolbar from "../../../components/search/SearchToolbar";
import SearchGrid from "../../../components/search/SearchGrid";
import SearchEmptyState from "../../../components/search/SearchEmptyState";
import SearchResultsHeader from "../../../components/search/SearchResultsHeader";

type PageProps = {
  searchParams?: {
    q?: string;
    department?: string; //  map department -> genre
    page?: string;
  };
};

const PAGE_SIZE = 10;

export default async function SearchPage({ searchParams }: PageProps) {
  const q = (searchParams?.q ?? "").trim();
  const department = (searchParams?.department ?? "").trim(); // genre
  const page = Math.max(1, Number(searchParams?.page ?? "1") || 1);

  // Build filters
  const filters = [];

  if (q) {
    const like = `%${q}%`;
    filters.push(
      or(
        ilike(books.title, like),
        ilike(books.author, like),
        ilike(books.genre, like),
      ),
    );
  }

  if (department && department !== "ALL") {
    // department maps to genre
    filters.push(eq(books.genre, department));
  }

  const where = filters.length ? and(...filters) : undefined;

  // For dropdown options: distinct genres
  const genresRows = await db
    .select({ genre: books.genre })
    .from(books)
    .groupBy(books.genre)
    .orderBy(books.genre);

  const genres = genresRows.map((g) => g.genre).filter(Boolean);

  // Count for pagination
  const countRows = await db
    .select({ count: sql<number>`count(*)` })
    .from(books)
    .where(where);

  const total = Number(countRows[0]?.count ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const offset = (safePage - 1) * PAGE_SIZE;

  const results = (await db
    .select()
    .from(books)
    .where(where)
    .orderBy(desc(books.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset)) as Book[];

  const hasQuery = Boolean(q || (department && department !== "ALL"));

  return (
    <div className="space-y-10">
      {/* Hero + Search */}
      <section className="rounded-2xl px-8 py-10">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-light-200">
          DISCOVER YOUR NEXT GREAT READ:
        </p>

        <h1 className="text-center font-bebas-neue text-4xl leading-tight text-light-100 sm:text-5xl md:text-6xl">
          Explore and Search for <br className="hidden sm:block" />
          <span className="text-primary">Any Book</span> In Our Library
        </h1>

        <div className="mx-auto w-full max-w-[560px] px-4 sm:px-0">
          <SearchToolbar />
        </div>
      </section>

      {/* Results Header */}
      <div className="mt-12 flex items-end justify-between">
        <h2 className="text-xl font-semibold leading-none text-light-100 md:text-2xl">
          {hasQuery
            ? `Search Results${q ? ` for "${q}"` : ""}`
            : "Browse Library"}
        </h2>

        <div className="shrink-0">
          <SearchResultsHeader genres={genres} />
        </div>
      </div>

      {/* Results */}
      {results.length ? (
        <SearchGrid
          books={results}
          totalPages={totalPages}
          currentPage={safePage}
          total={total}
        />
      ) : (
        <SearchEmptyState />
      )}
    </div>
  );
}
