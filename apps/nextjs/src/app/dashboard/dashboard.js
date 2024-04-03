'use client';
import CookieComponent from './components/CookieComponent';
import React from 'react';
import { useState } from 'react';
//import '../globals.css';
//const userId = <CookieComponent cookieName={'accessToken'} />;

export function Dashboard() {
  const [userId, setUserId] = useState(null);

  // Function to handle userId change
  const handleUserIdChange = userId => {
    setUserId(userId);
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-semibold">Dashboard</h1>
    </div>
  );
}
