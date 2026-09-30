export const nodes: [number, number, number][] = [
  [-2.7, 0.35, 1.15],
  [-0.95, 0.8, -0.35],
  [1.05, 0.55, 0.5],
  [2.8, 0.95, -1.05],
];
export function contour(
  layer: number,
  ring: number,
): [number, number, number][] {
  return Array.from({ length: 81 }, (_, i) => {
    const a = (i / 80) * Math.PI * 2;
    const r = 0.3 + ring * 0.14;
    return [
      Math.cos(a) * r * 1.7 + Math.sin(a * 3 + layer) * 0.11,
      layer * 0.17 + Math.max(0, 1 - ring / 12) * 0.24,
      Math.sin(a) * r * 0.72 + Math.cos(a * 4) * 0.12,
    ];
  });
}
export function project([x, y, z]: readonly number[]) {
  return [350 + x * 82, 215 + z * 48 - y * 65] as const;
}
export function svgPath(points: readonly (readonly number[])[]) {
  return points
    .map(
      (p, i) =>
        `${i ? "L" : "M"}${project(p)
          .map((v) => v.toFixed(2))
          .join(",")}`,
    )
    .join(" ");
}
