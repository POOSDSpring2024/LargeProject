'use client'
import { useState } from 'react';
import { HiArchive, HiCreditCard } from 'react-icons/hi';
import { FaHome, FaTruck, FaSignOutAlt } from 'react-icons/fa'; // Added FaSignOutAlt icon
import { TbReportSearch } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { BsArrowLeftShort } from 'react-icons/bs';

const SideNav = () => {


  return (
    <div className ="flex">
      <div className="bg-blue-600 h-screen p-5 w-72">SideBar</div>
      <div className = "p-5">
        <h1 className = "text-2xl font-semibold">Home Page</h1>
      </div>
    </div>

  );
};


export { SideNav };
