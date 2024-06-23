import Web3 from 'web3';

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
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
    });
  });
};

export default getWeb3;
