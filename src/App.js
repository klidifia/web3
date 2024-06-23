import React, { useEffect, useState } from 'react';
import getWeb3 from './utils/web3';
import Footer from './components/Footer';

const Web3Info = ({ web3Instance, networkId, account, balance }) => (
  <div>
    <h2>Web3 Instance:</h2>
    <pre>{JSON.stringify({ currentProvider: web3Instance.currentProvider.constructor.name, networkId: networkId !== null ? networkId.toString() : 'N/A' }, null, 2)}</pre>
    <h2>Account:</h2>
    <pre>{account}</pre>
    {balance !== null && (
      <div>
        <h2>Balance:</h2>
        <pre>{balance} BNB</pre>
      </div>
    )}
  </div>
);

const ErrorMessage = ({ error }) => (
  <div>
    <h2>Error:</h2>
    <pre>{error}</pre>
  </div>
);

const NetworkMessage = ({ networkId }) => (
  <div>
    <h2>Network:</h2>
    <pre>{networkId === '56' ? 'Connected to BNB Chain' : `Please connect to BNB Chain (Current Network ID: ${networkId})`}</pre>
  </div>
);

const App = () => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [error, setError] = useState(null);
  const [noWallet, setNoWallet] = useState(false);

  const loadWeb3Data = async (instance) => {
    try {
      const accounts = await instance.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const balance = await instance.eth.getBalance(accounts[0]);
        setBalance(instance.utils.fromWei(balance, 'ether'));
      }
      const networkId = await instance.eth.net.getId();
      setNetworkId(networkId.toString());
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
            } else {
              setAccount(null);
              setBalance(null);
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
      <h1>Welcome to web3</h1>
      {noWallet ? (
        <div>No wallet detected. Please install a web3 wallet.</div>
      ) : web3Instance ? (
        <>
          <NetworkMessage networkId={networkId} />
          {networkId === '56' && (
            <Web3Info web3Instance={web3Instance} networkId={networkId} account={account} balance={balance} />
          )}
        </>
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <div>Loading Web3...</div>
      )}
      <Footer />
    </div>
  );
};

export default App;
