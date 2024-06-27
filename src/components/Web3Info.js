import React from 'react';

const Web3Info = ({ web3Instance, networkId, account, balance, isWalletConnected, noWallet }) => {
  // Determine the currency based on the network ID
  const currency = networkId === '1' ? 'ETH' : 'BNB';

  // Determine the network message
  let networkMessage;
  if (noWallet) {
    networkMessage = 'No wallet detected. Please install a web3 wallet.';
  } else if (!isWalletConnected) {
    networkMessage = 'Wallet is not connected.';
  } else if (networkId === '1') {
    networkMessage = 'Connected to Ethereum';
  } else if (networkId === '56') {
    networkMessage = 'Connected to BNB Chain';
  } else {
    networkMessage = `Please connect to Ethereum or BNB Chain (Current Network ID: ${networkId})`;
  }

  return (
    <div>
      <pre>{networkMessage}</pre>
      {account && (
        <>
          <pre>{account}</pre>
          {balance !== null && (
            <div>
              <h2>Balance:</h2>
              <pre>{balance} {currency}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Web3Info;
