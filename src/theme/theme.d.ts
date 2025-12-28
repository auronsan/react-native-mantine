export type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Palette = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface MantineGradient {
  from: string;
  to: string;
  deg?: number;
}

export interface GradientConfig {
  colors: [string, string];
  start: { x: number; y: number };
  end: { x: number; y: number };
}
