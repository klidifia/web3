import React from 'react';
import './Header.css';
import NetworkSwitcher from './NetworkSwitcher';

const Header = ({ currentNetwork, switchNetwork, showNetworkSwitcher }) => {
  return (
    <header className="header">
      <h1>Welcome to web3</h1>
      {showNetworkSwitcher && (
        <NetworkSwitcher
          currentNetwork={currentNetwork}
          switchNetwork={switchNetwork}
        />
      )}
    </header>
  );
};

export default Header;
