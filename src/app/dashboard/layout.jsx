"use client"
import React, { useState } from 'react'
import Header from './_components/Header'

function DashboardLayout({children}) {

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