import React, { useEffect, useState } from 'react';

interface AnimatedLogoProps {
  size?: number;
  animate?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 80, animate = true }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setIsAnimated(true), 500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div className={`relative ${animate ? 'bloom-animation' : ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        className="drop-shadow-lg"
      >
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r="38"
          fill="url(#logoGradient)"
          className="filter drop-shadow-md"
        />
        
        {/* Petals */}
        <g className={isAnimated ? 'animate-pulse' : ''}>
          {[0, 60, 120, 180, 240, 300].map((rotation, index) => (
            <ellipse
              key={index}
              cx="40"
              cy="20"
              rx="6"
              ry="15"
              fill="#f093fb"
              opacity="0.8"
              transform={`rotate(${rotation} 40 40)`}
              className="animate-pulse"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            />
          ))}
        </g>

        {/* Letters B and S */}
        <text
          x="40"
          y="50"
          textAnchor="middle"
          fontSize="25"
          fontWeight="bold"
          fill="purple"
          className="font-serif"
        >
          𝔹𝕊
        </text>

        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#68d391" />
            <stop offset="50%" stopColor="#4fd1c7" />
            <stop offset="100%" stopColor="#38b2ac" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedLogo;