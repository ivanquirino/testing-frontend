import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import PlaceholderChart from './PlaceholderChart';

function Mocks() {
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('/me').then((res) => {
      setName(res.data.fullname);
    });
  });

  return (
    <Fragment>
      <h1>Mocks</h1>
      <h2>Nome: {name}</h2>
      <PlaceholderChart />
    </Fragment>
  );
}

export default Mocks;
