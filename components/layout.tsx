import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import Header from './header';
import supabase from '../lib/supabase';

type Props = {
  children: ReactNode;
  title?: string;
};

const defaultProps = {
  title: 'Daily Demo',
};

const Layout = ({ children, title }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = supabase.auth.user();

  useEffect(() => {
    if (!user)
      router.push(`/auth?redirectTo=${global?.window?.location?.href}`);
    else setLoading(false);
  }, [router, user]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div style={{ marginTop: '10vh' }}>
        {!loading ? (
          children
        ) : (
          <div className="d-flex align-items-center min-vh-100">
            <div className="container text-center">
              <h4>Loading</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Layout.defaultProps = defaultProps;
export default Layout;
