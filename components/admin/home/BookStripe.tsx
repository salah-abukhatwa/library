// components/admin/home/BookStripe.tsx
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import BookCover from "@/components/BookCover";

type Item = {
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  coverColor: string;
  borrowDate?: string | Date;
  userName?: string;
};

export default function BookStripe({
  item,
  showEye = false,
}: {
  item: Item;
  showEye?: boolean;
}) {
  return (
    <div className="book-stripe">
      <div className="shrink-0">
        <BookCover
          coverColor={item.coverColor}
          coverImage={item.coverUrl}
          variant="small"
          className="[filter:drop-shadow(-6px_-6px_12px_rgba(0,0,0,0.25))_drop-shadow(8px_10px_14px_rgba(0,0,0,0.18))]"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="title">{item.title}</p>

        <div className="author">
          <p>{item.author}</p>
          <div />
          <p>{item.genre}</p>
        </div>

        {item.userName && item.borrowDate && (
          <div className="user">
            <div className="avatar">
              <div className="size-6 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-primary-admin">
                {item.userName.slice(0, 1).toUpperCase()}
              </div>
              <p>{item.userName}</p>
            </div>

            <div className="borrow-date">
              <Image
                src="/icons/admin/calendar.svg"
                alt="date"
                width={14}
                height={14}
              />
              <p>{dayjs(item.borrowDate).format("DD/MM/YY")}</p>
            </div>
          </div>
        )}
      </div>

      {showEye && (
        <button
          type="button"
          className="size-9 rounded-md hover:bg-white/60 flex items-center justify-center"
          aria-label="View"
        >
          <Image src="/icons/admin/eye.svg" alt="view" width={18} height={18} />
        </button>
      )}
    </div>
  );
}
