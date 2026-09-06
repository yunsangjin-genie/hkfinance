import React from 'react';

interface HKLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' for dark background, 'dark' for light background
  size?: 'sm' | 'md' | 'lg';
}

export const HKLogo: React.FC<HKLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const isDarkBg = variant === 'light';
  const textColor = isDarkBg ? 'fill-white' : 'fill-[#24135F]';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
  };

  return (
    <div className={`inline-flex items-center select-none ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 280 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Heungkuk HK금융파트너스"
      >
        {/* Left magenta squares */}
        <rect x="2" y="7" width="16" height="16" fill="#E6007E" rx="1.5" />
        <rect x="2" y="32" width="16" height="16" fill="#E6007E" rx="1.5" />
        
        {/* Center magenta rotated diamond */}
        <rect
          x="28"
          y="6"
          width="28"
          height="28"
          fill="#E6007E"
          rx="2"
          transform="rotate(45 42 20)"
        />

        {/* English: Heungkuk */}
        <text
          x="78"
          y="23"
          className={textColor}
          fontFamily="'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="-0.3px"
        >
          Heungkuk
        </text>

        {/* Korean: HK금융파트너스 */}
        <text
          x="78"
          y="50"
          className={textColor}
          fontFamily="'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontSize="21"
          fontWeight="900"
          letterSpacing="-0.8px"
        >
          HK금융파트너스
        </text>
      </svg>
    </div>
  );
};
