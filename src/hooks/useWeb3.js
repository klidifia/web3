import { useState, useEffect } from 'react';
import getWeb3 from '../utils/web3';

const useWeb3 = () => {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [error, setError] = useState(null);
  const [noWallet, setNoWallet] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const switchNetwork = async (networkId) => {
    try {
      setLoading(true);
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(networkId, 10).toString(16)}` }],
      });
      const instance = await getWeb3();
      setWeb3Instance(instance);
      await loadWeb3Data(instance);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const instance = await getWeb3();
          setWeb3Instance(instance);
          await loadWeb3Data(instance);

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

          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
          });
        } else {
          setNoWallet(true);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initWeb3();
  }, []);

  return {
    web3Instance,
    account,
    balance,
    networkId,
    error,
    noWallet,
    isWalletConnected,
    loading,
    switchNetwork,
  };
};

export default useWeb3;
