import React from 'react';

/**
 * PawConnect Logo Component
 * Horizontal logo with clean paw print icon + text
 * 
 * @param {string} variant - 'light' or 'dark' (default: 'dark')
 * @param {number} height - Logo height in pixels (default: 40)
 * @param {string} className - Additional CSS classes
 */
export const PawConnectLogo = ({ variant = 'dark', height = 40, className = '' }) => {
  const isLight = variant === 'light';
  const iconColor = isLight ? '#FFFFFF' : '#1B4D3E';
  const textColor = isLight ? '#FFFFFF' : '#1B4D3E';
  const accentColor = '#FF7A36'; // Warm orange accent
  
  // Calculate width to maintain aspect ratio (280:56 = 5:1)
  const width = height * 5;
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Clean Paw Print Icon */}
      <g transform="translate(0, 8)">
        {/* Main central pad (large oval) */}
        <ellipse cx="16" cy="24" rx="10" ry="8" fill={iconColor}/>
        
        {/* Top left toe */}
        <ellipse cx="6" cy="8" rx="5" ry="5" fill={iconColor}/>
        
        {/* Top right toe */}
        <ellipse cx="26" cy="8" rx="5" ry="5" fill={iconColor}/>
        
        {/* Bottom left toe */}
        <ellipse cx="3" cy="20" rx="4.5" ry="4.5" fill={iconColor}/>
        
        {/* Bottom right toe */}
        <ellipse cx="29" cy="20" rx="4.5" ry="4.5" fill={iconColor}/>
      </g>
      
      {/* Text: PawConnect */}
      <text
        x="42"
        y="38"
        fill={textColor}
        fontSize="28"
        fontWeight="600"
        fontFamily="'Poppins', 'Nunito', 'Inter', system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="-0.3px"
      >
        Paw<tspan fill={accentColor} fontWeight="600">Connect</tspan>
      </text>
    </svg>
  );
};

export default PawConnectLogo;
