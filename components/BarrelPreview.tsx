"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { hslToCss, shiftLightness, type HSL } from "@/lib/color";

export type BarrelConfig = {
  staves: number;
  height: number;
  bulge: number;
  bandCount: number;
  woodHue: number;
  woodSaturation: number;
  woodLightness: number;
  charLevel: number;
  gloss: number;
  label: string;
};

type BarrelPreviewProps = {
  config: BarrelConfig;
};

export function BarrelPreview({ config }: BarrelPreviewProps) {
  const {
    staves,
    height,
    bulge,
    bandCount,
    woodHue,
    woodSaturation,
    woodLightness,
    charLevel,
    gloss,
    label
  } = config;

  const barrelGeometry = useMemo(() => {
    const baseHeight = 220;
    const computedHeight = baseHeight * (0.6 + height * 0.8);
    const topWidth = 160 - bulge * 35;
    const midWidth = topWidth + bulge * 120;
    const bottomWidth = topWidth - bulge * 25;
    const topY = 60;
    const bottomY = topY + computedHeight;
    const cx = 200;

    const staveLines = Array.from({ length: staves - 1 }).map((_, idx) => {
      const t = (idx + 1) / staves;
      const offsetTop = (topWidth / 2) * (t - 0.5) * 2;
      const curvature = bulge * 80;
      const offsetBottom =
        offsetTop +
        curvature * Math.sin((Math.PI * (idx + 1)) / staves) * (idx % 2 === 0 ? 1 : -1) * 0.2;
      return {
        x1: cx - offsetTop,
        x2: cx - offsetBottom
      };
    });

    const woodBase: HSL = {
      h: woodHue,
      s: woodSaturation,
      l: woodLightness
    };
    const charShift = charLevel * 25;
    const woodShadow = shiftLightness(woodBase, -18 - charShift);
    const woodHighlight = shiftLightness(woodBase, 14 - charLevel * 5);

    return {
      computedHeight,
      topWidth,
      midWidth,
      bottomWidth,
      topY,
      bottomY,
      cx,
      staveLines,
      woodBase,
      woodShadow,
      woodHighlight
    };
  }, [
    staves,
    height,
    bulge,
    woodHue,
    woodSaturation,
    woodLightness,
    charLevel
  ]);

  const {
    computedHeight,
    topWidth,
    midWidth,
    bottomWidth,
    topY,
    bottomY,
    cx,
    staveLines,
    woodBase,
    woodShadow,
    woodHighlight
  } = barrelGeometry;

  const bandPositions = useMemo(() => {
    const count = Math.max(1, bandCount);
    const gap = computedHeight / (count + 1);
    return Array.from({ length: count }).map((_, idx) => topY + gap * (idx + 1));
  }, [bandCount, computedHeight, topY]);

  const glossOpacity = 0.12 + gloss * 0.2;
  const glossWidth = 40 + gloss * 40;

  return (
    <motion.div
      className="relative mx-auto flex size-full max-w-3xl flex-1 items-center justify-center"
      animate={{
        rotateX: 12 - bulge * 6,
        rotateY: -8 + staves * 0.2,
        scale: 0.96 + gloss * 0.08
      }}
      transition={{ type: "spring", stiffness: 70, damping: 18 }}
      style={{ perspective: 1000 }}
    >
      <motion.svg
        viewBox="0 0 400 420"
        className="w-full max-w-xl drop-shadow-2xl"
        initial={false}
        animate={{ rotateY: -2 + bulge * 3 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <defs>
          <linearGradient id="barrel-body" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={hslToCss(woodShadow)} />
            <stop offset="40%" stopColor={hslToCss(woodBase)} />
            <stop offset="60%" stopColor={hslToCss(woodHighlight)} />
            <stop offset="100%" stopColor={hslToCss(woodShadow)} />
          </linearGradient>
          <linearGradient id="barrel-stave" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={hslToCss(shiftLightness(woodShadow, -2))} />
            <stop offset="30%" stopColor={hslToCss(woodBase)} />
            <stop offset="70%" stopColor={hslToCss(woodHighlight)} />
            <stop offset="100%" stopColor={hslToCss(shiftLightness(woodShadow, 5))} />
          </linearGradient>
          <linearGradient id="metal-band" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#2d2d2f" />
            <stop offset="40%" stopColor="#5b5d60" />
            <stop offset="60%" stopColor="#a6a7ac" />
            <stop offset="100%" stopColor="#1e1f21" />
          </linearGradient>
        </defs>

        <ellipse
          cx={cx}
          cy={topY - 1}
          rx={topWidth / 1.9}
          ry={(topWidth / 1.9) * 0.3}
          fill={hslToCss(shiftLightness(woodShadow, -8))}
          opacity={0.55 + charLevel * 0.1}
        />

        <path
          d={[
            `M ${cx - topWidth / 2} ${topY}`,
            `C ${cx - midWidth / 2} ${topY + computedHeight * 0.28} ${cx - midWidth / 2} ${
              bottomY - computedHeight * 0.28
            } ${cx - bottomWidth / 2} ${bottomY}`,
            `L ${cx + bottomWidth / 2} ${bottomY}`,
            `C ${cx + midWidth / 2} ${bottomY - computedHeight * 0.28} ${cx + midWidth / 2} ${
              topY + computedHeight * 0.28
            } ${cx + topWidth / 2} ${topY}`,
            "Z"
          ].join(" ")}
          fill="url(#barrel-body)"
          stroke={hslToCss(shiftLightness(woodShadow, -12))}
          strokeWidth={3}
        />

        {staveLines.map((line, idx) => (
          <path
            key={idx}
            d={[
              `M ${line.x1} ${topY}`,
              `C ${line.x1 - bulge * 60} ${topY + computedHeight * 0.28} ${line.x2 - bulge * 60} ${
                bottomY - computedHeight * 0.28
              } ${line.x2} ${bottomY}`
            ].join(" ")}
            stroke="url(#barrel-stave)"
            strokeWidth={2}
            opacity={0.6}
          />
        ))}

        {bandPositions.map((y, idx) => (
          <g key={idx}>
            <path
              d={[
                `M ${cx - midWidth / 2 - 12} ${y}`,
                `Q ${cx} ${y - 10} ${cx + midWidth / 2 + 12} ${y}`
              ].join(" ")}
              stroke="url(#metal-band)"
              strokeWidth={18}
              strokeLinecap="round"
            />
            <path
              d={[
                `M ${cx - midWidth / 2 - 11} ${y}`,
                `Q ${cx} ${y - 8} ${cx + midWidth / 2 + 11} ${y}`
              ].join(" ")}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={6}
              strokeLinecap="round"
            />
          </g>
        ))}

        <ellipse
          cx={cx}
          cy={bottomY + 4}
          rx={bottomWidth / 2}
          ry={(bottomWidth / 2) * 0.28}
          fill={hslToCss(shiftLightness(woodShadow, -15))}
          opacity={0.75}
        />

        <g opacity={glossOpacity}>
          <path
            d={[
              `M ${cx - glossWidth} ${topY + computedHeight * 0.12}`,
              `C ${cx - glossWidth * 0.8} ${topY + computedHeight * 0.32} ${
                cx - glossWidth * 0.8
              } ${bottomY - computedHeight * 0.38} ${cx - glossWidth * 0.6} ${
                bottomY - computedHeight * 0.18
              }`
            ].join(" ")}
            stroke="white"
            strokeWidth={14}
            strokeLinecap="round"
          />
        </g>

        {label && (
          <g>
            <path
              d={[
                `M ${cx - midWidth * 0.45} ${topY + computedHeight * 0.48}`,
                `Q ${cx} ${topY + computedHeight * 0.42} ${cx + midWidth * 0.45} ${
                  topY + computedHeight * 0.48
                }`,
                `L ${cx + midWidth * 0.39} ${topY + computedHeight * 0.64}`,
                `Q ${cx} ${topY + computedHeight * 0.6} ${cx - midWidth * 0.39} ${
                  topY + computedHeight * 0.64
                }`,
                "Z"
              ].join(" ")}
              fill="rgba(255, 243, 220, 0.8)"
              stroke="rgba(90, 70, 40, 0.6)"
              strokeWidth={2}
            />
            <text
              x={cx}
              y={topY + computedHeight * 0.58}
              textAnchor="middle"
              fontSize={Math.max(16, 24 - label.length * 0.4)}
              fontWeight={600}
              letterSpacing={1.5}
              fill="rgba(60,35,20,0.85)"
            >
              {label.toUpperCase()}
            </text>
          </g>
        )}
      </motion.svg>
    </motion.div>
  );
}
