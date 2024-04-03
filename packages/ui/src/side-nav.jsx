'use client'
import { useState } from 'react';
import { HiArchive, HiCreditCard } from 'react-icons/hi';
import { FaHome, FaTruck, FaSignOutAlt } from 'react-icons/fa'; // Added FaSignOutAlt icon
import { TbReportSearch } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

function SideNav() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleDasboard = () => {
    router.push('/dashboard');
  }

  const handleInventory = () =>{
    router.push('/dashboard/inventory');
  }

  const handleOrders = () =>{
    router.push('/dashboard/orders');
  }

  const handleSuppliers = () =>{

    router.push('/dashboard/suppliers');
  }

  const handleReport = () => {
      router.push('/dashboard/reports');
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('http://localhost:3001/api/auth/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        // Clear the cookie upon successful logout
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Change yourCookieName to the name of your cookie
        // Redirect to login page or any other appropriate page after successful logout
        router.push('/sign-in'); // Adjust the path to your login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col bg-blue-600 text-white w-64">
        {/* Buttons for navigation */}
        <div className="flex flex-col gap-4 pt-3 pb-6">
          <h1 className = "text-center text-white font-bold text-2xl p-2">Slicer</h1>
          
          <SideNavButton onClick={handleDasboard} icon={<FaHome size="24" />} text="Dashboard" />
          <SideNavButton onClick={handleInventory} icon={<HiArchive size="24" />} text="Inventory" />
          <SideNavButton onClick={handleOrders} icon={<HiCreditCard size="24" />} text="Orders" />
          <SideNavButton onClick={handleSuppliers} icon={<FaTruck size="24" />} text="Suppliers" />
          <SideNavButton onClick={handleReport} icon={<TbReportSearch size="24" />} text="Reports" />
         
         {/* there is definitely a better way to do this but it spaces the logout button at the bottom */}
         
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div> 

          
        </div>
       
        <div className="flex flex-col gap-4 pt-3 pb-6">
          <SideNavButton onClick={handleLogout} icon={<FaSignOutAlt size="24" />} text="Logout" />
        </div>
      </div>

    </div>
  );
};

const SideNavButton = ({ onClick, icon, text }) => (
  <button onClick={onClick} className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

export { SideNav, SideNavButton };