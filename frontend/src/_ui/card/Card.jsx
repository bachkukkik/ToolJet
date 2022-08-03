import React from 'react';
import { allSvgs } from '@tooljet/plugins/client';

const Card = ({ title, src, handleClick, height = 50, width = 50, usePluginIcon = false, iconFile }) => {
  const displayIcon = (src) => {
    if (iconFile) {
      return <img src={`data:image/svg+xml;base64,${iconFile}`} width={width} height={height} alt={title} />;
    }

    if (usePluginIcon) {
      const Icon = allSvgs[src];
      return <Icon style={{ height, width }} />;
    }

    return <img src={src} width={width} height={height} alt={title} />;
  };

  return (
    <div style={{ height: '112px', width: '164px' }} className="col-md-2 mb-4">
      <div
        className="card"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <div className="card-body">
          <center>
            {displayIcon(src)}
            <br></br>
            <br></br>
            <span>{title}</span>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Card;
