import React from 'react';

const Web3Info = ({ web3Instance, networkId, account, balance }) => {
  const currency = networkId === '1' ? 'ETH' : 'BNB';

  return (
    <div>
      <h2>Web3 Instance:</h2>
      <pre>{JSON.stringify({ currentProvider: web3Instance.currentProvider.constructor.name, networkId: networkId !== null ? networkId.toString() : 'N/A' }, null, 2)}</pre>
      <h2>Account:</h2>
      <pre>{account}</pre>
      {balance !== null && (
        <div>
          <h2>Balance:</h2>
          <pre>{balance} {currency}</pre>
        </div>
      )}
    </div>
  );
};

export default Web3Info;
