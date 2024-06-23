// Header.js
import React from 'react';

const Header = ({ currentNetwork, switchNetwork, showNetworkSwitcher }) => {
  return (
    <header>
      <h1>Welcome to web3</h1>
      {showNetworkSwitcher && (
        <div>
          <label htmlFor="network-switcher">Switch Network:</label>
          <select
            id="network-switcher"
            value={currentNetwork}
            onChange={(e) => switchNetwork(e.target.value)}
          >
            <option value="1">Ethereum Mainnet</option>
            <option value="56">BNB Chain</option>
          </select>
        </div>
      )}
    </header>
  );
};

export default Header;
