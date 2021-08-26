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
  NewPersonIcon,
  Paragraph,
  toaster,
} from 'evergreen-ui';

import { useRouter } from 'next/router';
import supabase from '../lib/supabase';
import Modal from './modal';

const Header = () => {
  const router = useRouter();
  const user = supabase.auth.user();
  const [show, setShow] = useState(false);

  return (
    <header className="bg-white nav-shadow fixed-top" id="header">
      <nav
        className="navbar navbar-light mx-3"
        style={{ textDecoration: 'none!important' }}>
        <a href="/">
          <span className="navbar-brand mb-0">Daily Metrics</span>
        </a>
        <div className="navbar-text d-flex">
          {router.pathname === '/room/[name]' && (
            <Button
              appearance="primary"
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
            <Avatar name={user?.email} size={30} hashValue="id_124" />
          </Popover>
        </div>
      </nav>
      <Modal
        title="Want to invite someone?"
        isShown={show}
        setIsShown={() => setShow(false)}
        hasFooter={false}>
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
      </Modal>
    </header>
  );
};

export default Header;
