/** Placeholder in basePrompt to be replaced with previous step output */
export const PREVIOUS_OUTPUT_PLACEHOLDER = '{{previousOutput}}';

/**
 * Builds a prompt by injecting the previous step's output into the base prompt.
 * Replaces {{previousOutput}} with previousOutput; if previousOutput is missing,
 * the placeholder is replaced with an empty string.
 * Uses split/join for literal replacement (no regex special-character issues).
 */
export function buildPrompt(
  basePrompt: string,
  previousOutput: string | null | undefined,
): string {
  const value = previousOutput ?? '';
  return basePrompt.split(PREVIOUS_OUTPUT_PLACEHOLDER).join(value);
}
