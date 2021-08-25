import React, { useState } from 'react';
import {
  Popover,
  Avatar,
  LogOutIcon,
  Menu,
  Position,
  Button,
  IconButton,
  ClipboardIcon,
  CornerDialog,
  NewPersonIcon,
  Paragraph,
  toaster,
} from 'evergreen-ui';

import { useRouter } from 'next/router';
import supabase from '../lib/supabase';

const Header = () => {
  const router = useRouter();
  const user = supabase.auth.user();
  const [show, setShow] = useState(false);

  return (
    <header className="bg-white nav-shadow fixed-top">
      <nav className="navbar navbar-light mx-3">
        <span className="navbar-brand mb-0">Daily Metrics</span>
        <div className="navbar-text d-flex">
          {router.pathname === '/room/[name]' && (
            <Button
              appearance="minimal"
              iconBefore={NewPersonIcon}
              onClick={() => setShow(true)}
              marginRight={20}>
              Invite User
            </Button>
          )}
          <Popover
            position={Position.BOTTOM_RIGHT}
            content={
              <Menu>
                <Menu.Group>
                  <Menu.Item
                    icon={LogOutIcon}
                    onClick={() => router.push('/logout')}>
                    Log out
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }>
            <Avatar name={user?.email} size={30} />
          </Popover>
        </div>
      </nav>
      <CornerDialog
        title="Want to invite someone?"
        isShown={show}
        hasFooter={false}
        onCloseComplete={() => setShow(false)}>
        <Paragraph>Click here to copy the invitation link.</Paragraph>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="invitation link"
            value={global?.window?.location?.href}
          />
          <div className="input-group-append">
            <IconButton
              icon={ClipboardIcon}
              size="large"
              onClick={() => {
                navigator.clipboard.writeText(global?.window?.location?.href);
                toaster.success('Copied to your clipboard');
              }}
            />
          </div>
        </div>
      </CornerDialog>
    </header>
  );
};

export default Header;
