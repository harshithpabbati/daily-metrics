import React from 'react';
import { Table } from 'evergreen-ui';
import dateFormat from 'dateformat';
import Skeleton from 'react-loading-skeleton';

type RoomsProps = {
  roomsData: any;
  loaded: boolean;
};

const Rooms = ({ roomsData, loaded }: RoomsProps) => {
  return (
    <div className="px-2 pt-2">
      <Table.Body>
        <Table.Head>
          <Table.HeaderCell flexBasis={60} flexShrink={0} flexGrow={0}>
            S.NO
          </Table.HeaderCell>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Room Name</Table.HeaderCell>
          <Table.HeaderCell>Privacy</Table.HeaderCell>
          <Table.HeaderCell>URL</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
        </Table.Head>
        <Table.VirtualBody height="70vh">
          {loaded ? (
            roomsData.data.map((room: any, index: number) => (
              <Table.Row
                key={room.id}
                isSelectable
                onSelect={() => alert(room.name)}>
                <Table.TextCell
                  isNumber
                  flexBasis={60}
                  flexShrink={0}
                  flexGrow={0}>
                  {index + 1}.
                </Table.TextCell>
                <Table.TextCell>{room.id}</Table.TextCell>
                <Table.TextCell>{room.name}</Table.TextCell>
                <Table.TextCell>{room.privacy}</Table.TextCell>
                <Table.TextCell>
                  <a href={room.url}>{room.url}</a>
                </Table.TextCell>
                <Table.TextCell>
                  {dateFormat(room.created_at, 'hh:mm:ss, mmmm dS, yyyy')}
                </Table.TextCell>
              </Table.Row>
            ))
          ) : (
            <Skeleton height={80} count={10} />
          )}
        </Table.VirtualBody>
      </Table.Body>
    </div>
  );
};

export default Rooms;
