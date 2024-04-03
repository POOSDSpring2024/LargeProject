import { Suppliers } from './suppliers';
import React from 'react';
import { SideNav } from '@repo/ui/side-nav';


export default async function Page() {
  return (
    <div className="flex">
    <SideNav />
    <Suppliers/>    
  </div>

  )
}

