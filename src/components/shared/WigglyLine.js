import React from 'react';
import PropTypes from 'prop-types';

const WigglyLine = ({ className = "" }) => (
  <svg className={className} width="100" height="20" viewBox="0 0 100 20" fill="none">
    <path
      d="M0 10 Q25 0 50 10 T100 10"
      stroke="#3182ce"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    >
      <animate
        attributeName="d"
        dur="3s"
        repeatCount="indefinite"
        values="M0 10 Q25 0 50 10 T100 10;M0 10 Q25 20 50 10 T100 10;M0 10 Q25 0 50 10 T100 10"
      />
    </path>
  </svg>
);

WigglyLine.propTypes = {
  className: PropTypes.string
};

export default WigglyLine;
