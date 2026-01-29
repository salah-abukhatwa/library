// components/ProfileCard.tsx
import Image from "next/image";
import React from "react";
import { GraduationCap, Hash, BadgeCheck } from "lucide-react";

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
        {/* Initials Avatar */}
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/10 text-base font-semibold text-light-100 ring-1 ring-white/10 sm:h-14 sm:w-14 sm:text-lg">
          {fullName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((n) => n[0]?.toUpperCase())
            .join("") || "U"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-light-100/80">
            <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" />
              Verified Student
            </span>
          </div>

          <h2 className="mt-1 truncate text-xl font-semibold text-light-100 sm:text-2xl">
            {fullName}
          </h2>

          <p className="truncate text-sm text-light-100/70">{email}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-full bg-white/10 sm:mt-8" />

      {/* Info rows */}
      <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
        {/* University */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <GraduationCap className="h-5 w-5 text-light-100/80" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-medium text-light-100/60">
                University
              </p>
              <p className="text-base font-semibold text-light-100 sm:text-lg">
                Next University
              </p>
            </div>
          </div>
        </div>

        {/* University ID */}
        <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Hash className="h-5 w-5 text-light-100/80" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-medium text-light-100/60">
                University ID
              </p>
              <p className="text-base font-semibold text-light-100 sm:text-lg">
                {universityId}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <div className="group relative overflow-hidden rounded-2xl">
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Frame */}
          <div className="relative rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur">
            {/* 3D Tilt container */}
            <div
              className="
          relative overflow-hidden rounded-xl
          transition-transform duration-500 will-change-transform
          group-hover:[transform:perspective(900px)_rotateX(3deg)_rotateY(-3deg)_translateY(-2px)]
        "
            >
              {/* Shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -left-1/2 top-0 h-full w-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>

              <Image
                src={universityCardUrl}
                alt="University Card"
                width={900}
                height={520}
                className="
            h-auto w-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.02]
          "
                priority={false}
              />
            </div>
          </div>

          {/* <p className="mt-2 ml-2 text-xs text-light-100/50">
            University ID Card
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
