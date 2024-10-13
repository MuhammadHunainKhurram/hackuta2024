import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <header className="w-full absolute top-0 left-0 z-10 p-4">
      <div className="container mx-auto flex items-center justify-between">

        <div className="flex items-center">
          <Image src='/eduGenie2.png' width={100} height={100} alt=''/>
        </div>
        
        <div>
        <UserButton
            appearance={{
              elements: {
                button: 'bg-slate-500 hover:bg-slate-400 text-sm w-17 h-17', // Adjust the class here for width and height
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
