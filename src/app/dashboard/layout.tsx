"use client";
import React, { ReactNode } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">{children}
      </div>
      
      <Footer />
    </div>
  );
}

export default DashboardLayout;