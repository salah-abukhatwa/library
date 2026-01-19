import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="Logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">NextLibrary</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/auth-illustration.png"
            alt="Library"
            className="h-full w-full object-cover
               brightness-[0.85] saturate-[0.85] contrast-[1.05]"
          />

          {/* Dark/brand overlay */}
          <div className="absolute inset-0 bg-[#12141D]/35" />

          {/* Extra gradient so it blends with the page */}
          <div
            className="absolute inset-0 bg-gradient-to-b
                  from-[#12141D]/20 via-transparent to-[#12141D]/55"
          />

          {/* Optional: add a cool tint (nice with navy UI) */}
          <div className="absolute inset-0 bg-[#24304A]/20 mix-blend-color" />
        </div>
      </section>
    </main>
  );
};

export default layout;
