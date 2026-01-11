import React from "react";

const LinkArrow = ({
  className,
  strokeWidth = "1",
  stroke = "currentColor",
}: {
  className?: string;
  strokeWidth?: string;
  stroke?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right size-4"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
};

export default LinkArrow;
