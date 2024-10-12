import React from "react";
import { Poppins } from 'next/font/google';
import Head from "next/head";
import Link from "next/link";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights you need
  variable: '--font-poppins',
});

function Hero() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-[length:300%_300%] animate-gradient text-white">
        <h1 className="text-6xl mb-6 tracking-wide text-center">
          <span className={`${poppins.className} font-extrabold text-gray-300`}>project</span>
          <span className={`${poppins.className} font-light text-gray-300`}>Name</span>
        </h1>
        <p className="container mx-auto mt-3 space-x-6 items-center justify-between text-lg text-center text-gray-200 mb-8 max-w-lg">
          <Link href="/(auth)/sign-up">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition-colors">
              Register
            </button>
          </Link>
          <Link href="/(auth)/sign-in">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </Link>
        </p>

        <p className="mt-5 text-sm text-gray-300 text-center">
          Learn more, with less.
        </p>
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
          © 2024 CHANGE ME. All rights reserved.
        </div>
      </div>
    </>
  );
}


export default Hero