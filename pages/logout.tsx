import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import supabase from '../lib/supabase';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
    };
    logout().finally(() => router.push('/auth'));
  }, [router]);

  return (
    <div className="d-flex align-items-center min-vh-100">
      <div className="container text-center">
        <h4>Please wait while we log you out!</h4>
      </div>
    </div>
  );
};

export default Logout;
