import Image from "next/image";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminBookActions from "./AdminBookActions";

export default function AdminBooksTable({ books }: { books: Book[] }) {
  return (
    <div className="mt-7 w-full overflow-x-auto rounded-xl border border-light-300 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-light-300/40">
            <TableHead className="min-w-[260px]">Book Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden lg:table-cell">Genre</TableHead>
            <TableHead className="hidden sm:table-cell">Date Created</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((b) => (
            <TableRow key={b.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-8 overflow-hidden rounded-sm">
                    <Image
                      src={b.coverUrl}
                      alt={b.title}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-1 text-sm font-semibold text-dark-400">
                      {b.title}
                    </p>
                    {/* extra info on mobile */}
                    <p className="mt-0.5 line-clamp-1 text-xs text-light-500 md:hidden">
                      {b.author} • {b.genre}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell text-sm text-light-500">
                {b.author}
              </TableCell>

              <TableCell className="hidden lg:table-cell text-sm text-light-500">
                {b.genre}
              </TableCell>

              <TableCell className="hidden sm:table-cell text-sm text-light-500">
                {b.createdAt ? dayjs(b.createdAt).format("MMM D, YYYY") : "—"}
              </TableCell>

              <TableCell className="text-right">
                <AdminBookActions bookId={b.id} />
              </TableCell>
            </TableRow>
          ))}

          {!books.length && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-sm text-light-500"
              >
                No books yet. Create your first book.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
