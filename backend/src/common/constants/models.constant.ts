export const AVAILABLE_MODELS = [
  'kimi-k2p5',
  'kimi-k2-instruct-0905',
] as const;

export type AvailableModel = (typeof AVAILABLE_MODELS)[number];
