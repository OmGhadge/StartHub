import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={120} height={32} className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#EE2B69] text-white font-semibold text-sm hover:bg-[#d41e57] transition">
                  <BadgePlus className="w-4 h-4" />
                  Create
                </button>
                <BadgePlus className="sm:hidden w-6 h-6 text-[#EE2B69]" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 font-medium text-sm hover:bg-gray-50 transition"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="w-10 h-10 border-2 border-[#EE2B69]">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 rounded-md bg-[#EE2B69] text-white font-semibold text-sm shadow hover:bg-[#d41e57] transition"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;