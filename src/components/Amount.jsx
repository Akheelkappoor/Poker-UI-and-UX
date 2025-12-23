import { formatNumber } from "../utils/format";

export const CoinIcon = ({ className = "" }) => (
  <svg
    className={`coin-icon ${className}`.trim()}
    width="20"
    height="20"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <rect x="246" y="40" width="20" height="432" fill="currentColor" rx="10" />
    <path
      d="M96 392 V120 L256 280 L416 120 V392"
      stroke="currentColor"
      strokeWidth="48"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Amount = ({ value, className = "", size = "md" }) => (
  <span className={`amount amount-${size} ${className}`.trim()}>
    <CoinIcon />
    {formatNumber(value)}
  </span>
);
