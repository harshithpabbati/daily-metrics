import axios from 'axios';

const handler = (req: any, res: any) => {
  async function getRooms() {
    const response = await axios.get('https://api.daily.co/v1/rooms', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
    });
    return res.status(200).json(response.data);
  }

  switch (req.method) {
    case 'GET':
      return getRooms();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
