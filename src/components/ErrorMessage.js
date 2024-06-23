import React from 'react';

const ErrorMessage = ({ error }) => (
  <div>
    <h2>Error:</h2>
    <pre>{error}</pre>
  </div>
);

export default ErrorMessage;
