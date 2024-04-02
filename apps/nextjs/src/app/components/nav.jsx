import React from 'react';
import Link from 'next/link';

export function Nav() {
  return (
    <div classname="relative h-32 w-32 justify-center">
      <div class="absolute inset-x-0 top-0 h-16 ...">
      <nav className="bg-blue-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="./" className="text-white text-xl font-bold">
              Slicer
            </a>
          </div>
          <div className="hidden md:block .justify-center ">
            <Link href="/sign-in">
              <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">
                Sign In
              </button>
            </Link>

            <Link href="/sign-up">
              <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
      </div>
    </div>
  );
}