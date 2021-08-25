import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import DailyIframe from '@daily-co/daily-js';
import axios from 'axios';

import supabase from '../../lib/supabase';
import Layout from '../../components/layout';

const DailyRoom = () => {
  const user = supabase.auth.user();
  const router = useRouter();

  useEffect(() => {
    let interval: any;
    let room: any;
    const getRoomURL = async (roomName: any) => {
      const res = await axios.get(`/api/room?name=${roomName}`);
      room = res;
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
    if (router.isReady && router.query.name) {
      const { name } = router.query;
      getRoomURL(name).then(url => callFrame.join({ url }));
      callFrame.once('left-meeting', handleLeave);
      callFrame.on('joined-meeting', handleMetrics);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  return (
    <Layout>
      <div>Loading...</div>
    </Layout>
  );
};

export default DailyRoom;
