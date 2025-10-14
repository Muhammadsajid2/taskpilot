const LogoSVG = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 100 C60 90, 80 80, 100 80 C120 80, 140 90, 140 100 C140 110, 120 120, 100 120 C80 120, 60 110, 60 100 Z"
      fill="#E6F0FA"
    />

    <path
      d="M70 100 C70 92, 85 85, 100 85 C115 85, 130 92, 130 100 C130 108, 115 115, 100 115 C85 115, 70 108, 70 100 Z"
      fill="#4A90E2"
    />
    <path
      d="M80 100 C80 94, 90 90, 100 90 C110 90, 120 94, 120 100 C120 106, 110 110, 100 110 C90 110, 80 106, 80 100 Z"
      fill="#2E6BB9"
    />

    <path d="M100 80 L150 50 L140 80 Z" fill="#4A90E2" />
    <path d="M100 120 L150 150 L140 120 Z" fill="#4A90E2" />
    <path d="M100 80 L50 50 L60 80 Z" fill="#4A90E2" />
    <path d="M100 120 L50 150 L60 120 Z" fill="#4A90E2" />

    <path
      d="M50 150 A100 100 0 0 1 150 50"
      stroke="#F5A623"
      stroke-width="15"
      fill="none"
    />
  </svg>
);

export const LogoIcon = (props) => <Icon component={LogoSVG} {...props} />;
