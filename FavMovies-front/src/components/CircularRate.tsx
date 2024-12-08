import React from "react";
const radius = 35;
const circumference = radius * 2 * Math.PI;
export const CircularRate = ({ value }: { value?: number }) => {
  return (
    <div className="circular-rate">
      <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="rgba(0, 0, 0, 0.5)"
          stroke="rgb(24, 160, 35)"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={((10 - (value || 0)) / 10) * circumference}
        />
        <text
          x="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          transform="rotate(90 25 25)"
          style={{ fontSize: 20 }}
        >
          {value ? value.toFixed(1) : 0}
        </text>
      </svg>
    </div>
  );
};
