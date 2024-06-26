'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        const { accessToken, businessIdList, error } = data;
        const expires = new Date();
        expires.setTime(expires.getTime() + 3 * 24 * 60 * 60 * 1000);
        document.cookie = `accessToken=${accessToken};expires=${expires.toUTCString()};path=/`;

        if (businessIdList.length < 1) {
          window.location.href = '/business-sign-in';
        } else {
          window.location.href = '/dashboard';
        }
        // If response is not ok, get error message from response body
        if (error === 'Email not Verified') {
          window.location.href = '/verify-email';
          setError(error);
        }
      } else {
        const data = await res.json();
        const { error } = data;
        setError(error);
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setError(
        `An unexpected error occurred. Please try again later. Error:${error}`
      );
    }
  };

  // Function to close the error popup
  const closeErrorPopup = () => {
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pb-16">
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
      <Link href="/sign-up">
        <button className="mt-4 text-blue-500">Not a user? Register now</button>
      </Link>

      <Link href="/forgot-password">
        <button className="mt-4 text-blue-500">Forgot Password?</button>
      </Link>

      {/* Error popup */}
      {error && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md">
            <p className="text-red-500">{error}</p>
            <button
              onClick={closeErrorPopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
