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
    <section className="relative h-[768px] w-full max-w-[566px] overflow-visible  rounded-2xl bg-gradient-to-b from-[#232839] to-[#12141D] p-10 shadow-[0_0_70px_rgba(0,0,0,0.4)]">
      {/* top notch */}
      <div className="absolute left-1/2 top-[-24px] h-[88px] w-[59px] -translate-x-1/2 rounded-b-[28px] bg-gradient-to-b from-[#464F6F] to-[#12141D]">
        <div className="absolute left-1/2 top-[52px] h-[10px] w-[40px] -translate-x-1/2 rounded-full bg-black/30" />
      </div>

      <div className="mt-10 flex items-start gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-white/10" />
        <div>
          <div className="flex items-center gap-2 text-xs text-light-100/80">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Verified Student
          </div>
          <h2 className="mt-1 text-2xl font-semibold text-light-100">
            {fullName}
          </h2>
          <p className="text-sm text-light-100/70">{email}</p>
        </div>
      </div>

      <div className="mt-10 space-y-2">
        <p className="text-sm text-light-100/70">University</p>
        <p className="text-xl font-semibold text-light-100">Next University</p>
      </div>
      <div className="mt-6 space-y-2">
        <p className=" text-sm text-light-100/70">University ID</p>
        <p className="text-lg font-semibold text-light-100">{universityId}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl">
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
