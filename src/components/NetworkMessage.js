import React from 'react';

const NetworkMessage = ({ networkId }) => {
  let message;
  if (networkId === '1') {
    message = 'Connected to Ethereum Mainnet';
  } else if (networkId === '56') {
    message = 'Connected to BNB Chain';
  } else {
    message = `Please connect to Ethereum Mainnet or BNB Chain (Current Network ID: ${networkId})`;
  }

  return (
    <div>
      <h2>Network:</h2>
      <pre>{message}</pre>
    </div>
  );
};

export default NetworkMessage;