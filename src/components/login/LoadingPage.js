import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingPage = () => (
  <div className="loader">
    <RingLoader
      sizeUnit={'px'}
      size={ 100 }
      color={'#4abdac'}
      loading={ true }
    />
  </div>
);

export default LoadingPage;
