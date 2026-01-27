// components/ProfileCard.tsx
import Image from "next/image";
import React from "react";

type Props = {
  fullName: string;
  email: string;
  universityId: number;
  universityCardUrl: string;
};

const ProfileCard = ({
  fullName,
  email,
  universityId,
  universityCardUrl,
}: Props) => {
  return (
    <section className="relative w-full max-w-[566px] self-start overflow-visible rounded-2xl bg-gradient-to-b from-[#232839] to-[#12141D] p-6 sm:p-10 shadow-[0_0_70px_rgba(0,0,0,0.4)]">
      {/* top notch */}
      <div
        className="
          absolute left-1/2 top-[-18px] -translate-x-1/2
          h-[72px] w-[52px] rounded-b-[24px]
          bg-gradient-to-b from-[#464F6F] to-[#12141D]
          sm:top-[-24px] sm:h-[88px] sm:w-[59px] sm:rounded-b-[28px]
        "
      >
        <div
          className="
            absolute left-1/2 top-[44px] -translate-x-1/2
            h-[8px] w-[34px] rounded-full bg-black/30
            sm:top-[52px] sm:h-[10px] sm:w-[40px]
          "
        />
      </div>

      <div className="mt-10 flex items-start gap-4 sm:mt-12">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-white/10 sm:h-14 sm:w-14" />

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-light-100/80">
            <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            Verified Student
          </div>

          <h2 className="mt-1 truncate text-xl font-semibold text-light-100 sm:text-2xl">
            {fullName}
          </h2>

          <p className="truncate text-sm text-light-100/70">{email}</p>
        </div>
      </div>

      <div className="mt-8 space-y-2 sm:mt-10">
        <p className="text-sm text-light-100/70">University</p>
        <p className="text-lg font-semibold text-light-100 sm:text-xl">
          Next University
        </p>
      </div>

      <div className="mt-5 space-y-2 sm:mt-6">
        <p className="text-sm text-light-100/70">University ID</p>
        <p className="text-base font-semibold text-light-100 sm:text-lg">
          {universityId}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl sm:mt-10">
        <Image
          src={universityCardUrl}
          alt="University Card"
          width={900}
          height={520}
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
};

export default ProfileCard;
