import React from 'react';

const Loader = ({ small, color }) => {
  const isSmall = small ? 'small' : '';
  const isColor = color ?? '';

  return (
    <div className={`lds-ring ${isSmall} ${isColor}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
