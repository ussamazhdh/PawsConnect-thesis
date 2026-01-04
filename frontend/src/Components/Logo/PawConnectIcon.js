import React from 'react';

/**
 * PawConnect Icon Component
 * Square icon version for favicon/app icon - Clean paw print
 * 
 * @param {string} variant - 'light' or 'dark' (default: 'dark')
 * @param {number} size - Icon size in pixels (default: 40)
 * @param {string} className - Additional CSS classes
 */
export const PawConnectIcon = ({ variant = 'dark', size = 40, className = '' }) => {
  const isLight = variant === 'light';
  const iconColor = isLight ? '#FFFFFF' : '#1B4D3E';
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Clean Paw Print Icon - centered */}
      <g transform="translate(50, 50)">
        {/* Main central pad (large oval) */}
        <ellipse
          cx="0"
          cy="5"
          rx="9"
          ry="7"
          fill={isLight ? '#FFFFFF' : iconColor}
        />
        {/* Top left toe */}
        <ellipse
          cx="-10"
          cy="-10"
          rx="4.5"
          ry="4.5"
          fill={isLight ? '#FFFFFF' : iconColor}
        />
        {/* Top right toe */}
        <ellipse
          cx="10"
          cy="-10"
          rx="4.5"
          ry="4.5"
          fill={isLight ? '#FFFFFF' : iconColor}
        />
        {/* Bottom left toe */}
        <ellipse
          cx="-12"
          cy="2"
          rx="4"
          ry="4"
          fill={isLight ? '#FFFFFF' : iconColor}
        />
        {/* Bottom right toe */}
        <ellipse
          cx="12"
          cy="2"
          rx="4"
          ry="4"
          fill={isLight ? '#FFFFFF' : iconColor}
        />
      </g>
    </svg>
  );
};

export default PawConnectIcon;
