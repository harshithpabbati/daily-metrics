import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextInputField, Pane, Button, Alert } from 'evergreen-ui';

import { AuthChangeEvent } from '@supabase/supabase-js';
import supabase from '../lib/supabase';

const Auth = () => {
  const user = supabase.auth.user();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signIn({ email });
    if (error) setError(error);
    else setSent(true);
  };

  useEffect(() => {
    /* fires when a user signs in */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent) => {
        if (event === 'SIGNED_IN') {
          router.push('/');
        }
      },
    );
    const user = supabase.auth.user();
    if (user) router.push('/');
    return () => {
      authListener.unsubscribe();
    };
  }, [router]);

  const getAlert = () => {
    if (loading) {
      if (error)
        return (
          <Alert
            intent="danger"
            title={`Error ${error.status}`}
            marginBottom={32}>
            {error.message}
          </Alert>
        );
      if (sent)
        return (
          <Alert intent="success" title="Email sent!" marginBottom={32}>
            Please confirm the email which we sent to your email address for
            successful authentication.
          </Alert>
        );
      return (
        <Alert intent="none" title="Sending you email" marginBottom={32}>
          Please wait while we send you the email.
        </Alert>
      );
    }
  };

  if (user) router.push('/');
  return (
    <div className="row d-flex h-100 min-vh-100 align-items-center">
      <div className="col-md-4 offset-md-4">
        <Pane elevation={1} background="white">
          <div className="p-4">
            {getAlert()}
            <h3>Auth</h3>
            <p>Fill in your email, we will send you a magic link.</p>
            <form onSubmit={handleSubmit}>
              <TextInputField
                label="Email"
                placeholder="Your email address"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Button type="submit" appearance="primary">
                Lets go!
              </Button>
            </form>
          </div>
        </Pane>
      </div>
    </div>
  );
};

export default Auth;
