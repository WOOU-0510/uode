import {
  layout,
  layoutWithLines,
  prepare,
  prepareWithSegments,
  type LayoutLinesResult,
  type LayoutResult,
  type PrepareOptions,
} from "@chenglou/pretext";

export type TextBlockMeasureInput = {
  text: string;
  /** Canvas `font` 문자열과 CSS `font` 단축 속성을 맞춥니다. */
  font: string;
  maxWidth: number;
  lineHeight: number;
  prepareOptions?: PrepareOptions;
};

export const measureTextBlockHeight = (
  input: TextBlockMeasureInput,
): LayoutResult => {
  const prepared = prepare(input.text, input.font, input.prepareOptions);
  return layout(prepared, input.maxWidth, input.lineHeight);
};

export const measureTextBlockLines = (
  input: TextBlockMeasureInput,
): LayoutLinesResult => {
  const prepared = prepareWithSegments(
    input.text,
    input.font,
    input.prepareOptions,
  );
  return layoutWithLines(prepared, input.maxWidth, input.lineHeight);
};
