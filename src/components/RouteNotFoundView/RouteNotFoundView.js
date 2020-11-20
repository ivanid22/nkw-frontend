import React from 'react';
import { useHistory } from 'react-router-dom';

const RouteNotFoundView = () => {
  const history = useHistory();
  history.push('/auth/sign_in');

  return (
    <div>
      <h1> Route not found </h1>
    </div>
  );
};

export default RouteNotFoundView;
