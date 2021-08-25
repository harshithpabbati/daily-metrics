import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextInputField, Pane, Button, Alert } from 'evergreen-ui';

import supabase from '../lib/supabase';

const Auth = () => {
  const user = supabase.auth.user();
  const [email, setEmail] = useState<string>();
  const [sent, setSent] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signIn({ email });
    setSent(true);
  };

  if (user) push('/');
  return (
    <div className="row d-flex h-100 min-vh-100 align-items-center">
      <div className="col-md-4 offset-md-4">
        <Pane elevation={1} background="white">
          <div className="p-4">
            {sent && (
              <Alert intent="success" title="Email sent!" marginBottom={32}>
                Please confirm the email which we sent to your email address for
                successful authentication.
              </Alert>
            )}
            <h3>Auth</h3>
            <p>Fill in your email, we will send you a magic link.</p>
            <form onSubmit={handleSubmit}>
              <TextInputField
                label="Email"
                labelFor="email"
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
