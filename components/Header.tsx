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
    <header className="my-6 flex items-center justify-between gap-3 sm:my-10 sm:gap-5">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2 sm:gap-3">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={60}
          height={60}
          className="h-10 w-10 sm:h-[60px] sm:w-[60px]"
        />
        {/* Hide brand text on very small screens */}
        <span className="hidden text-base font-semibold text-light-100 sm:inline">
          Next-Library
        </span>
      </Link>

      {/* Right: Nav */}
      <nav className="flex items-center gap-3 sm:gap-8">
        <Link
          href="/"
          className="text-sm text-light-100 hover:text-light-200 sm:text-base"
        >
          Home
        </Link>

        <Link
          href="/search"
          className="text-sm text-light-100 hover:text-light-200 sm:text-base"
        >
          Search
        </Link>

        {session?.user && (
          <>
            <Link
              href="/my-profile"
              className="flex items-center gap-2 sm:gap-3"
            >
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarFallback className="bg-amber-100 text-dark-100">
                  {getInitials(session.user.name || "NN")}
                </AvatarFallback>
              </Avatar>

              {/* Hide username on small screens */}
              <span className="hidden text-base text-light-100 sm:inline">
                {session.user.name}
              </span>
            </Link>

            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
              >
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
