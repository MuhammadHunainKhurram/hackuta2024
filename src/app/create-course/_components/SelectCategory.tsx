import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

function SelectCategory() {
    function handleCategoryChange(name: string): void {
        throw new Error('Function not implemented.')
    }

    return (
    <div className='px-10 md:px-20'>
        <div className='grid grid-cols-3 gap-2 md:gap-10 '>
            {CategoryList.map((item,index)=>(
                <div>
                    <Image src={item.icon} width={50} height={50} alt={''}/>
                    <h2 className='text-sm hidden md:block'>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectCategory