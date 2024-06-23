import React from 'react';
import useWeb3 from './hooks/useWeb3';
import Header from './components/Header';
import Footer from './components/Footer';
import Web3Info from './components/Web3Info';
import NetworkMessage from './components/NetworkMessage';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const {
    web3Instance,
    account,
    balance,
    networkId,
    error,
    noWallet,
    isWalletConnected,
    loading,
    switchNetwork,
  } = useWeb3();

  return (
    <div className="App">
      <Header
        currentNetwork={networkId || ''}
        switchNetwork={switchNetwork}
        showNetworkSwitcher={!noWallet}
      />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <NetworkMessage networkId={networkId} isWalletConnected={isWalletConnected} noWallet={noWallet} />
              {web3Instance && (networkId === '1' || networkId === '56') && (
                <Web3Info web3Instance={web3Instance} networkId={networkId} account={account} balance={balance} />
              )}
            </>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
