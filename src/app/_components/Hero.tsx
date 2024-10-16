"use client";
import React, { useEffect } from "react";
import { Poppins } from 'next/font/google';
import Link from "next/link";
import { useUser} from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import Image from "next/image";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});



function Hero() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard'); // Redirect to /dashboard if signed in
    }
  }, [isSignedIn, router]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-[length:300%_300%] animate-gradient text-white">
        <Image src='/eduGenie2.png' width={250} height={250} alt=''/>
        <h1 className="text-6xl mb-6 tracking-wide text-center">
          <span className={`${poppins.className} font-extrabold text-gray-300`}>edu</span>
          <span className={`${poppins.className} font-light text-gray-300`}>Genie</span>
        </h1>
        <p className="container mx-auto mt-3 space-x-6 items-center justify-between text-lg text-center text-gray-200 mb-8 max-w-lg">
          <Link href="/sign-up">
            <button className="bg-blue-200 bg-opacity-40 text-white px-4 py-2 rounded-2xl hover:bg-blue-500 transition-colors">
              Register
            </button>
          </Link>
          <Link href="/sign-in">
            <button className="bg-blue-200 bg-opacity-40 text-white px-4 py-2 rounded-2xl hover:bg-blue-500 transition-colors">
              Sign In
            </button>
          </Link>
        </p>

        <p className="mt-5 text-sm text-gray-300 text-center">
          Learn more, with less.
        </p>
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
          © 2024 eduGenie. All rights reserved.
        </div>
      </div>
    </>
  );
}


export default Hero