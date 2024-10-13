"use client";
import { useUser, SignIn } from '@clerk/nextjs'
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export default function Page() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is signed in, redirect to the dashboard
    if (isSignedIn) {
      router.push('/dashboard'); // Replace '/dashboard' with your actual dashboard route
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return (
      <section className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-[length:300%_300%] animate-gradient text-white">
        <div className="absolute inset-0 bg-black opacity-30" /> 
        
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-6xl mb-6 tracking-wide text-center">
            <span className={`${poppins.className} font-thin text-gray-300`}>welcome backto </span>
            <span className={`${poppins.className} font-extrabold text-gray-300`}>edu</span>
            <span className={`${poppins.className} font-light text-gray-300`}>Genie</span>
          </h1>
    
          <SignIn />
          
        </div>
    
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400">
          © 2024 eduGenie. All rights reserved.
        </div>
      </section>
    );
  }
}