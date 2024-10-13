import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between'>
        <Image src={'/file.png'} width={50} height={50} alt={'logo'}/>
        <UserButton/>
    </div>
  )
}

export default Header