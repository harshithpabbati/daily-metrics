import axios from 'axios';

const handler = (req: any, res: any) => {
  async function getRoom(name: string) {
    const response = await axios.get(`https://api.daily.co/v1/rooms/${name}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
    });
    return res.status(200).json(response.data);
  }

  async function createRoom() {
    try {
      const response = await axios.post(
        'https://api.daily.co/v1/rooms',
        JSON.stringify(req.body),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
          },
        },
      );
      console.log(response);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  switch (req.method) {
    case 'GET':
      return getRoom(req.query.name);
    case 'POST':
      return createRoom();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
