interface Props {
  size?: number;
  className?: string;
}
const PlayIcon = ({ size = 24, className = '' }: Props) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 18"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.7"
        d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z"
      />
    </svg>
  );
};

export default PlayIcon;
