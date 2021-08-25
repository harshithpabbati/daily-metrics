import React from 'react';
import { Popover, Avatar, LogOutIcon, Menu, Position } from 'evergreen-ui';

import supabase from '../lib/supabase';

const Header = () => {
  const user = supabase.auth.user();
  return (
    <header className="bg-white nav-shadow fixed-top">
      <nav className="navbar navbar-light mx-3">
        <span className="navbar-brand mb-0">Daily Metrics</span>
        <div className="navbar-text d-flex">
          <Popover
            position={Position.BOTTOM_RIGHT}
            content={
              <Menu>
                <Menu.Group>
                  <Menu.Item
                    icon={LogOutIcon}
                    onClick={() => supabase.auth.signOut()}>
                    Log out
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }>
            <Avatar name={user?.email} size={30} />
          </Popover>
        </div>
      </nav>
    </header>
  );
};

export default Header;
