import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  PlusIcon,
  KeyEnterIcon,
  Heading,
  Paragraph,
  Pane,
  TextInputField,
  Alert,
} from 'evergreen-ui';
import axios from 'axios';

import supabase from '../lib/supabase';
import Layout from '../components/layout';
import Modal from '../components/modal';
import Rooms from '../components/rooms';

const Homepage = () => {
  const [loaded, setLoaded] = useState(false);
  const [rooms, setRooms] = useState({
    total_count: 0,
    data: [],
  });
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [form, setForm] = useState({
    name: '',
    properties: {
      enable_new_call_ui: true,
      enable_network_ui: true,
      enable_chat: true,
    },
  });
  const [error, setError] = useState('');

  const { push } = useRouter();
  const user = supabase.auth.user();

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get('/api/rooms');
      setRooms(res.data);
    };
    if (!user) push('/auth');
    else fetchRooms().finally(() => setLoaded(true));
  }, [push, user]);

  const onSave = async () => {
    if (type === 'create') {
      const res = await axios.post('/api/room', form);
      if (res.data.url) {
        push(`/room/${res.data.name}`);
        setShow(false);
      } else setError(`A room named "${form.name}" already exists.`);
    } else push(`/room/${form.name}`);
  };

  return (
    <Layout title="Daily Demo">
      <div className="m-4">
        <div className="px-2 pt-2">
          <Pane display="flex" padding={16} background="white">
            <Pane flex={1} alignItems="center">
              <Heading is="h3">Rooms</Heading>
              <Paragraph color="muted">
                There are {rooms.total_count} rooms
              </Paragraph>
            </Pane>
            <Pane>
              <Button
                iconBefore={KeyEnterIcon}
                onClick={() => {
                  setShow(true);
                  setType('join');
                }}
                marginRight={16}>
                Join Room
              </Button>
              <Button
                appearance="primary"
                iconBefore={PlusIcon}
                onClick={() => {
                  setShow(true);
                  setType('create');
                }}>
                Create Room
              </Button>
            </Pane>
          </Pane>
        </div>
        <Rooms roomsData={rooms} loaded={loaded} />
      </div>
      <Modal
        isShown={show}
        setIsShown={setShow}
        label={type === 'create' ? 'Create' : 'Join'}
        onSave={onSave}
        title={
          type === 'create' ? 'Want to create a new room?' : 'Joining a room?'
        }>
        <div className="p-2">
          {error !== '' && (
            <Alert
              intent="danger"
              title="We are not able to create room"
              marginBottom={32}>
              {error}
            </Alert>
          )}
          <TextInputField
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, name: e.target.value })
            }
            label="Name of the room"
            placeholder="Enter Room Name"
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default Homepage;
