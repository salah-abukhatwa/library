import Image from "next/image";
import React from "react";

export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-8 text-center">
      <div className="confirm-illustration bg-light-300">
        <div className="bg-white">
          <Image
            src="/icons/admin/empty.svg"
            alt="Empty"
            width={40}
            height={40}
          />
        </div>
      </div>

      <h4 className="mt-4 text-base font-semibold text-dark-400">{title}</h4>
      <p className="mt-1 max-w-sm text-sm text-light-500">{description}</p>
    </div>
  );
}
