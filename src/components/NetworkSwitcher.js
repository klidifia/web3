import React from 'react';

const NetworkSwitcher = ({ currentNetwork, switchNetwork }) => {
  return (
    <div>
      <label htmlFor="network-switcher" className="sr-only">Switch Network:</label>
      <select
        id="network-switcher"
        value={currentNetwork}
        onChange={(e) => switchNetwork(e.target.value)}
      >
        <option value="1">Ethereum</option>
        <option value="56">BNB Chain</option>
      </select>
    </div>
  );
};

export default NetworkSwitcher;
