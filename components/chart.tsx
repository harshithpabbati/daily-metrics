import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type ChartPaneProps = {
  data: any;
};

const ChartPane = ({ data }: ChartPaneProps) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="videoRecvBitsPerSecond"
          stroke="#387908"
        />
        <Line
          type="monotone"
          dataKey="videoSendBitsPerSecond"
          stroke="#8884d8"
        />
        <Line type="monotone" dataKey="videoRecvPacketLoss" stroke="#666" />
        <Line type="monotone" dataKey="videoSendPacketLoss" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartPane;
