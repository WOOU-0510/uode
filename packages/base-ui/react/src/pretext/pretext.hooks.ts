import {
  layout,
  layoutWithLines,
  prepare,
  prepareWithSegments,
  type LayoutLinesResult,
  type LayoutResult,
  type TextBlockMeasureInput,
} from "@uode/base-ui-core";
import * as React from "react";

const emptyLinesResult = (): LayoutLinesResult => ({
  height: 0,
  lineCount: 0,
  lines: [],
});

/**
 * `prepare` + `layout`로 단락 높이·줄 수를 계산합니다.
 * SSR 환경에서는 Canvas를 쓸 수 없으므로 `{ height: 0, lineCount: 0 }`으로 시작한 뒤,
 * 클라이언트에서 측정합니다.
 * `prepareOptions`는 참조가 바뀔 때마다 다시 측정하므로, 필요하면 상위에서 `useMemo`로
 * 안정화하세요.
 */
export const useTextBlockHeight = (
  input: TextBlockMeasureInput,
): LayoutResult => {
  const [result, setResult] = React.useState<LayoutResult>({
    height: 0,
    lineCount: 0,
  });

  React.useLayoutEffect(() => {
    const prepared = prepare(input.text, input.font, input.prepareOptions);
    setResult(layout(prepared, input.maxWidth, input.lineHeight));
  }, [
    input.text,
    input.font,
    input.maxWidth,
    input.lineHeight,
    input.prepareOptions,
  ]);

  return result;
};

/**
 * `prepareWithSegments` + `layoutWithLines`로 줄 단위 텍스트까지 얻습니다.
 * SSR에서는 빈 `lines`로 시작합니다.
 */
export const useTextBlockLines = (
  input: TextBlockMeasureInput,
): LayoutLinesResult => {
  const [result, setResult] =
    React.useState<LayoutLinesResult>(emptyLinesResult);

  React.useLayoutEffect(() => {
    const prepared = prepareWithSegments(
      input.text,
      input.font,
      input.prepareOptions,
    );
    setResult(layoutWithLines(prepared, input.maxWidth, input.lineHeight));
  }, [
    input.text,
    input.font,
    input.maxWidth,
    input.lineHeight,
    input.prepareOptions,
  ]);

  return result;
};
