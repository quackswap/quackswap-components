import React from 'react';

interface AvaxLogoProps {
  size?: string;
}

const AvaxLogo: React.FC<AvaxLogoProps> = ({ size = '24px' }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 1000.000000 1000.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="500" cy="500" r="400" fill="white" />
      <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)" fill="#E84142" stroke="none">
        <path
          d="M4590 9989 c-1442 -124 -2734 -838 -3594 -1984 -572 -761 -904 -1642
-986 -2610 -13 -155 -13 -635 0 -790 123 -1453 833 -2745 1985 -3609 761 -572
1642 -904 2610 -986 155 -13 635 -13 790 0 1453 123 2745 833 3609 1985 572
761 904 1642 986 2610 13 155 13 635 0 790 -123 1453 -833 2745 -1985 3609
-761 572 -1642 904 -2610 986 -139 11 -666 11 -805 -1z m458 -1530 c39 -19 79
-50 109 -84 64 -72 782 -1332 824 -1445 41 -113 59 -231 59 -385 0 -159 -19
-277 -63 -394 -23 -59 -293 -536 -861 -1521 -456 -789 -853 -1472 -882 -1516
-118 -179 -349 -347 -582 -423 -157 -51 -179 -53 -992 -49 l-755 3 -60 24
c-86 34 -158 108 -180 185 -19 63 -16 116 10 202 21 70 2972 5247 3025 5307
114 129 223 159 348 96z m1919 -3378 c50 -23 124 -90 163 -146 42 -62 1009
-1762 1043 -1835 43 -89 49 -202 17 -278 -28 -65 -92 -123 -169 -154 l-56 -23
-1110 0 -1110 0 -59 24 c-63 25 -138 87 -162 132 -42 82 -38 189 10 295 36 79
1035 1807 1076 1862 41 54 118 115 164 130 53 17 147 13 193 -7z"
        />
      </g>
    </svg>
  );
};

export default AvaxLogo;
