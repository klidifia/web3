import React, { useEffect, useState } from 'react';
import getWeb3 from './utils/web3';
import Header from './components/Header';
import Footer from './components/Footer';
import Web3Info from './components/Web3Info';
import NetworkMessage from './components/NetworkMessage';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [error, setError] = useState(null);
  const [noWallet, setNoWallet] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const loadWeb3Data = async (instance) => {
    try {
      const accounts = await instance.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const balance = await instance.eth.getBalance(accounts[0]);
        setBalance(instance.utils.fromWei(balance, 'ether'));
        setIsWalletConnected(true);
      } else {
        setIsWalletConnected(false);
      }
      const networkId = await instance.eth.net.getId();
      setNetworkId(networkId.toString());
    } catch (err) {
      setError(err.message);
    }
  };

  const switchNetwork = async (networkId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(networkId, 10).toString(16)}` }],
      });
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const instance = await getWeb3();
          setWeb3Instance(instance);
          await loadWeb3Data(instance);

          // Listen for account changes
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              instance.eth.getBalance(accounts[0]).then(balance => {
                setBalance(instance.utils.fromWei(balance, 'ether'));
              });
              setIsWalletConnected(true);
            } else {
              setAccount(null);
              setBalance(null);
              setIsWalletConnected(false);
            }
          });

          // Listen for network changes
          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
          });
        } else {
          setNoWallet(true);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    initWeb3();
  }, []);

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
          <NetworkMessage networkId={networkId} isWalletConnected={isWalletConnected} noWallet={noWallet} />
          {web3Instance && (networkId === '1' || networkId === '56') && (
            <Web3Info web3Instance={web3Instance} networkId={networkId} account={account} balance={balance} />
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
