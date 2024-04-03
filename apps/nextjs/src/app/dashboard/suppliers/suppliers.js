'use client';
import { SideNav } from '@repo/ui/side-nav';
import CookieComponent from '../components/CookieComponent';
import React from 'react';
import { useState } from 'react';

const userId = <CookieComponent cookieName={'accessToken'} />;

export function Suppliers() {
  const [userId, setUserId] = useState(null);

  // Function to handle userId change
  const handleUserIdChange = userId => {
    setUserId(userId);
  };

  return (
    <div className="flex">
      <CookieComponent
        cookieName={'accessToken'}
        onUserIdChange={handleUserIdChange}
      />
    </div>
  );
}
