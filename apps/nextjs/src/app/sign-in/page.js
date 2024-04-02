import React from 'react';

import SignIn from './sign-in';
import { Nav } from '../components/nav';

export default async function Page() {
  return (
    <div>
      <Nav />
      <SignIn />
    </div>
  );
}
