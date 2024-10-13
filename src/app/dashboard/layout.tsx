"use client"
import React, { ReactNode } from 'react'
import Header from './_components/Header'

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
        <div>
          <Header/>
          <div className='p-10'>
          {children}
          </div>
           
        </div>
       
    </div>
  )
}

export default DashboardLayout