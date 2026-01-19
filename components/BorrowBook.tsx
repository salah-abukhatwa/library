"use client";

import { borrowBook } from "@/lib/actions/books";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import Image from "next/image";

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string | null;
  };
}

const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handelBorrow = async () => {
    if (!isEligible) {
      toast.error(message || "You are not eligible to borrow this book.");
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ userId, bookId });
      if (result.success) {
        toast.success("Book borrowed successfully!");
        router.push("/my-profile");
      } else {
        toast.error(
          result.message || "Failed to borrow book. Please try again."
        );
      }
    } catch (error) {
      toast.error("Failed to borrow book. Please try again.");
    } finally {
      setBorrowing(false);
    }
  };
  return (
    <Button
      className="book-overview_btn "
      disabled={borrowing || !isEligible}
      onClick={handelBorrow}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
