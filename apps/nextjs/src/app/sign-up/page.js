import React from 'react';

import SignUp from './sign-up';
import { Nav } from '../components/nav';

export default async function Page() {
  return (
    <div>
      <Nav />
      <SignUp />
      
    </div>
  );
}
