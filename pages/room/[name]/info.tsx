import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Pane,
  Text,
  Heading,
  UnorderedList,
  ListItem,
  TickIcon,
  Paragraph,
} from 'evergreen-ui';
import dateFormat from 'dateformat';

import supabase from '../../../lib/supabase';
import Layout from '../../../components/layout';
import ChartPane from '../../../components/chart';

const Info = () => {
  const router = useRouter();
  const [meeting, setMeeting] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<any>({});

  useEffect(() => {
    const formattedData = (data: any) => {
      return {
        timestamp: dateFormat(data.stats.latest.timestamp, 'h:MM:ss'),
        videoRecvBitsPerSecond: data.stats.latest.videoRecvBitsPerSecond,
        videoSendBitsPerSecond: data.stats.latest.videoSendBitsPerSecond,
        videoRecvPacketLoss: data.stats.latest.videoRecvPacketLoss,
        videoSendPacketLoss: data.stats.latest.videoSendPacketLoss,
      };
    };
    const getData = async () => {
      const users: any = {};
      const { data } = await supabase.rpc('room_metrics', {
        roomname: router.query.name,
      });
      setMeeting(data[0]?.roommeetingdata.room);

      data.forEach((record: any) => {
        const data: any[] = users[record.userid] || [];
        users[record.userid] = [...data, formattedData(record.roomdata)];
      });
      setUsersData(users);
      setLoading(false);
    };
    if (router.isReady) getData();
  }, [router.isReady, router.query.name]);

  return (
    <Layout>
      {!loading ? (
        <Pane elevation={1} padding={16} margin={24}>
          {meeting && Object.keys(meeting).length > 0 ? (
            <>
              <div className="row">
                <div className="col-md-3 col-sm-12">
                  <Heading is="h5" marginTop={12}>
                    Room ID
                  </Heading>
                  <Text>{meeting?.id}</Text>
                </div>
                <div className="col-md-2 col-sm-12">
                  <Heading is="h5" marginTop={12}>
                    Room Name
                  </Heading>
                  <Text>{meeting?.name}</Text>
                </div>
                <div className="col-md-3 col-sm-12">
                  <Heading is="h5" marginTop={12}>
                    Room URL
                  </Heading>
                  <a href={meeting?.url}>{meeting?.url}</a>
                </div>
                <div className="col-md-2 col-sm-12">
                  <Heading is="h5" marginTop={12}>
                    Created by API?
                  </Heading>
                  <Text>{meeting?.api_created ? 'Yes' : 'No'}</Text>
                </div>
                <div className="col-md-2 col-sm-12">
                  <Heading is="h5" marginTop={12}>
                    Created At
                  </Heading>
                  <Text>
                    {dateFormat(meeting?.created_at, 'hh:mm:ss, mmmm dS, yyyy')}
                  </Text>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-12">
                  <Heading is="h5" marginTop={12}>
                    Room Configurations
                  </Heading>
                  <UnorderedList icon={TickIcon} iconColor="success">
                    {Object.keys(meeting?.config).map(property => (
                      <ListItem>{property}</ListItem>
                    ))}
                  </UnorderedList>
                </div>
                <div className="col-md-12 col-sm-12">
                  <Heading is="h5" marginTop={12}>
                    Metrics
                  </Heading>
                  <Paragraph marginTop={12}>
                    Participants ({Object.keys(usersData).length})
                  </Paragraph>
                  <div className="row">
                    {Object.keys(usersData).map((user: any) => {
                      return (
                        <div
                          className="col-md-6 my-4 py-2"
                          style={{ height: '30vh' }}>
                          <Paragraph>Participant - {user}</Paragraph>
                          <ChartPane data={usersData[user]} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Sorry, I think you are on a wrong page</p>
          )}
        </Pane>
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

export default Info;
