import type { MantineNumberSize, MantineSize } from './MantineSize';

export type SystemProp<Value> =
  | Value
  | Partial<Record<MantineSize | (string & {}), Value>>;

export type SpacingValue = MantineNumberSize | (string & {});

export type MantineStyleSystemProps = any;
