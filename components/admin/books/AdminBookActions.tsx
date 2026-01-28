"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteBook } from "@/lib/admin/actions/book";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function AdminBookActions({ bookId }: { bookId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onConfirmDelete = async () => {
    try {
      setLoading(true);

      const res = await deleteBook(bookId);

      if (!res.success) {
        toast.error("Delete failed", { description: res.error });
        return;
      }

      toast.success("Book deleted");
      router.refresh();
    } catch (err: any) {
      toast.error("Delete failed", {
        description: err?.message ?? "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <Link
        href={`/admin/books/${bookId}/edit`}
        className="text-primary-admin hover:opacity-80"
        aria-label="Edit"
      >
        <Pencil className="h-4 w-4" />
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            className="text-red-400 hover:opacity-80"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
