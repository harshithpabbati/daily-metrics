import React from 'react';
import { useRouter } from 'next/router';

const Info = () => {
  const router = useRouter();
  return <p>hello ${router.query.name}</p>;
};

export default Info;
