"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

export function NavBar() {
  const { logout } = useUser();
  return (
    <header className="py-4">
      <div className="container m-auto">
        <nav className="flex justify-end lg:flex">
          <div className="flex gap-2 p-2">
            <Button size="sm" variant="destructive" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
