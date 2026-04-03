import { prepareWithSegments, walkLineRanges } from "@uode/base-ui-core";
import * as React from "react";
import styles from "./PretextShrinkWrapDemo.module.scss";

const DEMO_FONT =
  '16px ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const SHRINK_TEXT =
  "이 문장들이 한 덩어리일 때, 각 줄의 실제 그려진 너비 중 최댓값이 “딱 맞는” 상자 너비에 가깝습니다. " +
  "walkLineRanges로 줄마다 폭을 읽을 수 있어요. Short. 한글 혼합 Mixed width.";

type PretextShrinkWrapDemoProps = Record<string, never>;

export const PretextShrinkWrapDemo = (props: PretextShrinkWrapDemoProps) => {
  const {} = props;

  const [probeWidth, setProbeWidth] = React.useState(420);
  const [lineCount, setLineCount] = React.useState(0);
  const [widestLine, setWidestLine] = React.useState(0);
  const [lines, setLines] = React.useState<
    readonly { index: number; width: number }[]
  >([]);

  React.useLayoutEffect(() => {
    const prepared = prepareWithSegments(SHRINK_TEXT, DEMO_FONT);
    let count = 0;
    let maxW = 0;
    const detail: { index: number; width: number }[] = [];
    walkLineRanges(prepared, probeWidth, (line) => {
      count += 1;
      if (line.width > maxW) {
        maxW = line.width;
      }
      detail.push({
        index: count - 1,
        width: Math.round(line.width * 100) / 100,
      });
    });
    setLineCount(count);
    setWidestLine(Math.round(maxW * 100) / 100);
    setLines(detail);
  }, [probeWidth]);

  return (
    <section className={styles.section} aria-labelledby="shrink-wrap-heading">
      <h2 id="shrink-wrap-heading">3. walkLineRanges · 줄 폭 / 줄 수</h2>
      <div className={styles.prose}>
        <p>
          README에 나온 것처럼, 충분히 넓은 <code>maxWidth</code>로{" "}
          <code>walkLineRanges</code>를 돌리면 각 줄의 실제 폭을 알 수 있고, 그
          중 <strong>가장 넓은 줄의 폭</strong>이 말풍선처럼 “내용에 맞는 최소
          너비” 추정에 쓰일 수 있습니다. 아래 슬라이더는{" "}
          <strong>가상의 컨테이너 너비</strong>를 바꿔 같은 텍스트가 몇 줄로
          나뉘는지 보여 줍니다.
        </p>
      </div>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          가상 컨테이너 너비 (px): {probeWidth}
        </span>
        <input
          type="range"
          min={160}
          max={640}
          value={probeWidth}
          onChange={(e) => {
            setProbeWidth(Number(e.target.value));
          }}
        />
      </label>

      <dl className={styles.metrics}>
        <div>
          <dt>줄 수 (이 너비에서)</dt>
          <dd>{lineCount}</dd>
        </div>
        <div>
          <dt>이번 레이아웃에서 가장 넓은 줄</dt>
          <dd>{widestLine}px</dd>
        </div>
      </dl>

      <h3 className={styles.subsectionTitle}>줄별 측정 폭 (샘플)</h3>
      <ul className={styles.lineWidthList}>
        {lines.slice(0, 12).map((row) => {
          return (
            <li key={row.index}>
              줄 {row.index + 1}: <code>{row.width}px</code>
            </li>
          );
        })}
        {lines.length > 12 ? (
          <li className={styles.lineWidthMore}>… 외 {lines.length - 12}줄</li>
        ) : null}
      </ul>
    </section>
  );
};
