import React from "react";

const blurLayers = [
  { blur: 1, start: 0, end: 30 },
  { blur: 2, start: 10, end: 40 },
  { blur: 4, start: 20, end: 50 },
  { blur: 8, start: 30, end: 60 },
  { blur: 12, start: 40, end: 70 },
  { blur: 16, start: 50, end: 80 },
  { blur: 24, start: 60, end: 90 },
  { blur: 32, start: 70, end: 100 },
];

const BottomBlur = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-40 overflow-hidden"
    >
      {blurLayers.map(({ blur, start, end }) => {
        const mask = `linear-gradient(
          to bottom,
          transparent ${start}%,
          black ${end}%
        )`;

        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}

      {/* Subtle background blending */}
      <div
        className="bg-background/10 absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 50%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 50%, black 100%)",
        }}
      />
    </div>
  );
};

export default BottomBlur;
