import { Session } from "next-auth";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.name}
        </h2>
        <p className="text-slate-500 text-base">
          Monitor all of your projects and tasks here
        </p>
      </div>

      {/* Logout (server action) */}
      <form action={logout} className="flex justify-end">
        <Button
          type="submit"
          variant="outline"
          className="gap-2 border-light-400 bg-white text-dark-400 hover:bg-light-300"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </form>
    </header>
  );
};

export default Header;
