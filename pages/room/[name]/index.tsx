import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DailyIframe from '@daily-co/daily-js';
import axios from 'axios';

import { Card } from 'evergreen-ui';
import supabase from '../../../lib/supabase';
import Layout from '../../../components/layout';

const DailyRoom = () => {
  const user = supabase.auth.user();
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let interval: any;
    let room: any;
    const getRoomURL = async (roomName: any) => {
      const res = await axios.get(`/api/room?name=${roomName}`);
      room = res.data;
      return res.data.url;
    };
    const handleLeave = () => {
      router.push('/');
      clearInterval(interval);
    };
    const logMetrics = async (metrics: any) => {
      if (Object.keys(metrics.stats).length > 0)
        await supabase.from('metrics').insert({
          data: metrics,
          call_data: { room },
          user_id: user.id,
          room: router.query.name,
        });
    };
    const callFrame = DailyIframe.createFrame({
      // @ts-ignore
      showFullscreenButton: true,
      showLeaveButton: true,
      showParticipantsBar: true,
      iframeStyle: {
        position: 'fixed',
        border: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    });
    const handleMetrics = () => {
      interval = setInterval(async function log() {
        const stats = await callFrame.getNetworkStats();
        await logMetrics(stats);
      }, 15000);
    };
    if (router.isReady && router.query.name && user) {
      const { name } = router.query;
      getRoomURL(name)
        .then(url => callFrame.join({ url }))
        .catch(() => setNotFound(true));
      callFrame.once('left-meeting', handleLeave);
      callFrame.on('joined-meeting', handleMetrics);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  return (
    <Layout>
      {notFound ? (
        <div className="row d-flex h-100 min-vh-100 align-items-center">
          <div className="col-md-5 offset-md-4">
            <Card elevation={1} background="white">
              <div className="p-4">
                <h3>Not Found</h3>
                <h5>Looks like the room does not exist</h5>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center min-vh-100">
          <div className="container text-center">
            <h4>Loading...</h4>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DailyRoom;
