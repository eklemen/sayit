interface Props {
  size?: number;
  className?: string;
}

const TrashIcon = ({ size = 26, className = '' }: Props) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 20"
      className={className}
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.7"
        d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
      />
    </svg>
  );
};

export default TrashIcon;
