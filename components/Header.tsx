// components/Header.tsx
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="my-10 flex items-center justify-between gap-5">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/icons/logo.svg" alt="Logo" width={60} height={60} />
        <span className="text-base font-semibold text-light-100">
          Next-Library
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        <Link
          href="/"
          className="text-base text-light-100 hover:text-light-200"
        >
          Home
        </Link>

        <Link
          href="/search"
          className="text-base text-light-100 hover:text-light-200"
        >
          Search
        </Link>

        {session?.user && (
          <>
            <Link href="/my-profile" className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-amber-100 text-dark-100">
                  {getInitials(session.user.name || "NN")}
                </AvatarFallback>
              </Avatar>
              <span className="text-base text-light-100">
                {session.user.name}
              </span>
            </Link>

            {/* ✅ Use your server action */}
            <form action={logout}>
              <Button type="submit" variant="ghost" size="icon">
                <Image
                  src="/icons/logout.svg"
                  alt="Logout"
                  width={18}
                  height={18}
                />
              </Button>
            </form>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
