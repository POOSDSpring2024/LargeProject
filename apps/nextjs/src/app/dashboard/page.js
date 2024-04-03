import { Dashboard } from './dashboard';
import React from 'react';
import { SideNav } from '@repo/ui/side-nav';
//import { SideNav } from '@repo/ui/old-side-nav';

export default async function Page() {
  return (
    
    
      <div className="flex">
        <SideNav />
        <Dashboard />    
      </div>
      
      
    )
 
}
