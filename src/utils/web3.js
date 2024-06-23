import Web3 from 'web3';

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      initializeWeb3(resolve, reject);
    } else {
      window.addEventListener('load', () => initializeWeb3(resolve, reject));
    }
  });
};

const initializeWeb3 = async (resolve, reject) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      resolve(web3);
    } catch (error) {
      reject('User denied account access');
    }
  } else if (window.web3) {
    const web3 = window.web3;
    resolve(web3);
  } else {
    reject('No wallet detected');
  }
};

export default getWeb3;
