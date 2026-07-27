import type { LayoutLinesResult, LayoutResult } from "@uode/base-ui-core";
import {
  measureTextBlockHeight,
  measureTextBlockLines,
  useTextBlockHeight,
  useTextBlockLines,
} from "@uode/base-ui-react";
import * as React from "react";
import styles from "./PretextBasicDemoSection.module.scss";

const DEMO_FONT =
  '16px ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

type PretextBasicDemoSectionProps = Record<string, never>;

export const PretextBasicDemoSection = (
  props: PretextBasicDemoSectionProps,
) => {
  const {} = props;

  const [text, setText] = React.useState(
    "AGI 春天到了. بدأت الرحلة 🚀 Pretext는 DOM 측정 없이 줄바꿈·높이를 계산합니다.",
  );
  const [maxWidth, setMaxWidth] = React.useState(280);
  const [lineHeight, setLineHeight] = React.useState(22);
  const [whiteSpaceMode, setWhiteSpaceMode] = React.useState<
    "normal" | "pre-wrap"
  >("normal");

  const measureInput = React.useMemo(
    () => ({
      text,
      font: DEMO_FONT,
      maxWidth,
      lineHeight,
      prepareOptions:
        whiteSpaceMode === "normal"
          ? undefined
          : { whiteSpace: "pre-wrap" as const },
    }),
    [text, maxWidth, lineHeight, whiteSpaceMode],
  );

  const hookHeight = useTextBlockHeight(measureInput);
  const hookLines = useTextBlockLines(measureInput);

  const [imperativeHeight, setImperativeHeight] = React.useState<LayoutResult>(
    () => ({ height: 0, lineCount: 0 }),
  );
  const [imperativeLines, setImperativeLines] =
    React.useState<LayoutLinesResult>(() => ({
      height: 0,
      lineCount: 0,
      lines: [],
    }));

  React.useLayoutEffect(() => {
    setImperativeHeight(measureTextBlockHeight(measureInput));
    setImperativeLines(measureTextBlockLines(measureInput));
  }, [measureInput]);

  return (
    <section className={styles.section} aria-labelledby="basic-heading">
      <h2 id="basic-heading">1. 고정 폭 · 높이 / 줄 목록</h2>
      <p className={styles.previewCaption}>
        <code>prepare</code> + <code>layout</code> /{" "}
        <code>layoutWithLines</code>에 대응하는 <code>useTextBlockHeight</code>,{" "}
        <code>measureTextBlockLines</code> 등을 바로 써 보는 구간입니다.
      </p>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>본문</span>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          rows={5}
          spellCheck={false}
        />
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>최대 너비 (px): {maxWidth}</span>
          <input
            type="range"
            min={120}
            max={480}
            value={maxWidth}
            onChange={(e) => {
              setMaxWidth(Number(e.target.value));
            }}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>줄 높이 (px): {lineHeight}</span>
          <input
            type="range"
            min={14}
            max={40}
            value={lineHeight}
            onChange={(e) => {
              setLineHeight(Number(e.target.value));
            }}
          />
        </label>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.fieldLabel}>white-space</legend>
        <label className={styles.radio}>
          <input
            type="radio"
            name="ws-basic"
            checked={whiteSpaceMode === "normal"}
            onChange={() => {
              setWhiteSpaceMode("normal");
            }}
          />
          normal (공백 접기)
        </label>
        <label className={styles.radio}>
          <input
            type="radio"
            name="ws-basic"
            checked={whiteSpaceMode === "pre-wrap"}
            onChange={() => {
              setWhiteSpaceMode("pre-wrap");
            }}
          />
          pre-wrap (textarea 스타일)
        </label>
      </fieldset>

      <h3 className={styles.subsectionTitle}>측정 결과</h3>
      <dl className={styles.metrics}>
        <div>
          <dt>훅 · height</dt>
          <dd>{hookHeight.height}px</dd>
        </div>
        <div>
          <dt>훅 · lineCount</dt>
          <dd>{hookHeight.lineCount}</dd>
        </div>
        <div>
          <dt>함수 · height</dt>
          <dd>{imperativeHeight.height}px</dd>
        </div>
        <div>
          <dt>함수 · lineCount</dt>
          <dd>{imperativeHeight.lineCount}</dd>
        </div>
      </dl>
      <p className={styles.hint}>
        <code>useTextBlockLines</code> 줄 수: {hookLines.lines.length}
      </p>

      <div className={styles.twoCol}>
        <div>
          <h3 className={styles.subsectionTitle}>줄 미리보기 (훅)</h3>
          <div
            className={styles.previewBox}
            style={{
              maxWidth,
              font: DEMO_FONT,
              lineHeight: `${lineHeight}px`,
            }}
          >
            {hookLines.lines.map((line, index) => {
              return (
                <div
                  key={`hook-${index}-${line.text}`}
                  className={styles.previewLine}
                >
                  {line.text.length > 0 ? line.text : "\u00a0"}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className={styles.subsectionTitle}>줄 미리보기 (명령형)</h3>
          <div
            className={styles.previewBox}
            style={{
              maxWidth,
              font: DEMO_FONT,
              lineHeight: `${lineHeight}px`,
            }}
          >
            {imperativeLines.lines.map((line, index) => {
              return (
                <div
                  key={`imp-${index}-${line.text}`}
                  className={styles.previewLine}
                >
                  {line.text.length > 0 ? line.text : "\u00a0"}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
