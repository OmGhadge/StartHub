'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut, Menu, X, BadgePlus, ChevronDown } from 'lucide-react';
import { serverSignIn, serverSignOut } from '@/components/auth-actions';

interface NavbarProps {
  user?: {
    name: string;
    image: string;
    id?: string; // Added for user profile link
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              StartupHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/startups" className="text-gray-700 hover:text-gray-900 transition-colors">
              Browse
            </Link>
            {user && (
              <Link href="/startup/create">
                <Button className="flex items-center gap-2 bg-black text-white font-semibold text-sm hover:bg-gray-900 transition">
                  <BadgePlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create</span>
                </Button>
              </Link>
            )}
            {user ? (
              <>
                <form action={serverSignOut} className="hidden md:block">
                  <Button type="submit" className="flex items-center gap-2 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
                    <LogOut className="h-4 w-4 text-black" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </form>
                <Link href={user.id ? `/user/${user.id}` : "/user/me"} className="ml-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <form action={serverSignIn}>
                <Button type="submit" className="flex items-center gap-2 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </form>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/startups" className="text-gray-700 hover:text-gray-900 transition-colors">
                Browse
              </Link>
              {user && (
                <Link href="/startup/create">
                  <Button className="flex items-center gap-2 bg-black text-white font-semibold text-sm hover:bg-gray-900 transition w-full justify-center">
                    <BadgePlus className="w-4 h-4" />
                    <span>Create</span>
                  </Button>
                </Link>
              )}
              {user ? (
                <>
                  <form action={serverSignOut}>
                    <Button type="submit" className="flex items-center gap-2 w-full justify-center bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
                      <LogOut className="h-4 w-4 text-red-500" />
                      <span>Logout</span>
                    </Button>
                  </form>
                  <div className="flex items-center space-x-3 pt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-700 text-sm">{user.name}</span>
                  </div>
                </>
              ) : (
                <form action={serverSignIn}>
                  <Button type="submit" className="flex items-center gap-2 w-full justify-center bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}