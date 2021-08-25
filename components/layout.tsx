import React, { ReactNode, useEffect } from 'react';
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
  const user = supabase.auth.user();

  useEffect(() => {
    if (!user) router.push('/auth');
  }, [router, user]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div style={{ marginTop: '10vh' }}>{children}</div>
    </div>
  );
};

Layout.defaultProps = defaultProps;
export default Layout;
