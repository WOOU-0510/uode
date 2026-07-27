import {
  layoutNextLine,
  prepareWithSegments,
  type LayoutCursor,
} from "@uode/base-ui-core";
import * as React from "react";
import styles from "./PretextDragFloatDemo.module.scss";

const DEMO_FONT =
  '16px ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const FLOAT_DEMO_COPY =
  "왼쪽에 떠 있는 박스를 드래그해 보세요. 이 문단은 한 개의 텍스트 스트림이며, " +
  "줄마다 사용 가능한 너비가 달라질 때마다 layoutNextLine으로 다음 줄을 뽑습니다. " +
  "The quick brown fox jumps over the lazy dog. 春天 夏天 秋天 冬天. 🚀";

const CONTAINER_WIDTH = 360;
const LINE_HEIGHT = 22;
const FLOAT_PADDING = 8;
const MIN_LINE_WIDTH = 52;
const MAX_LAYOUT_LINES = 400;

type FloatRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type ProjectedLine = {
  text: string;
  y: number;
  maxWidth: number;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

const getMaxWidthForLineY = (
  y: number,
  lineHeightPx: number,
  containerWidth: number,
  float: FloatRect,
  padding: number,
): number => {
  const lineTop = y;
  const lineBottom = y + lineHeightPx;
  const overlapsFloatVertically =
    lineBottom > float.top && lineTop < float.top + float.height;
  if (!overlapsFloatVertically) {
    return containerWidth;
  }
  return Math.max(MIN_LINE_WIDTH, float.left - padding);
};

type PretextDragFloatDemoProps = Record<string, never>;

export const PretextDragFloatDemo = (props: PretextDragFloatDemoProps) => {
  const {} = props;

  const [floatRect, setFloatRect] = React.useState<FloatRect>(() => ({
    left: 72,
    top: 28,
    width: 96,
    height: 104,
  }));

  const dragRef = React.useRef<{
    pointerId: number;
    originX: number;
    originY: number;
    startFloat: FloatRect;
  } | null>(null);

  const [lines, setLines] = React.useState<readonly ProjectedLine[]>([]);

  React.useLayoutEffect(() => {
    const prepared = prepareWithSegments(FLOAT_DEMO_COPY, DEMO_FONT);
    const projected: ProjectedLine[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = 0;
    let guard = 0;
    while (guard < MAX_LAYOUT_LINES) {
      guard += 1;
      const maxW = getMaxWidthForLineY(
        y,
        LINE_HEIGHT,
        CONTAINER_WIDTH,
        floatRect,
        FLOAT_PADDING,
      );
      const line = layoutNextLine(prepared, cursor, maxW);
      if (line === null) {
        break;
      }
      projected.push({ text: line.text, y, maxWidth: maxW });
      cursor = line.end;
      y += LINE_HEIGHT;
    }
    setLines(projected);
  }, [floatRect]);

  const stageHeight = React.useMemo(() => {
    if (lines.length === 0) {
      return 280;
    }
    const last = lines[lines.length - 1];
    if (last === undefined) {
      return 280;
    }
    return Math.max(280, last.y + LINE_HEIGHT + 24);
  }, [lines]);

  const stageHeightRef = React.useRef(stageHeight);
  React.useLayoutEffect(() => {
    stageHeightRef.current = stageHeight;
  }, [stageHeight]);

  React.useLayoutEffect(() => {
    setFloatRect((prev) => {
      const maxTop = Math.max(0, stageHeight - prev.height);
      if (prev.top <= maxTop) {
        return prev;
      }
      return { ...prev, top: maxTop };
    });
  }, [stageHeight]);

  const onFloatPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      originX: event.clientX,
      originY: event.clientY,
      startFloat: floatRect,
    };
  };

  const onFloatPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag === null || event.pointerId !== drag.pointerId) {
      return;
    }
    const dx = event.clientX - drag.originX;
    const dy = event.clientY - drag.originY;
    setFloatRect((prev) => {
      const nextLeft = clamp(
        drag.startFloat.left + dx,
        0,
        CONTAINER_WIDTH - prev.width,
      );
      const nextTop = clamp(
        drag.startFloat.top + dy,
        0,
        stageHeightRef.current - prev.height,
      );
      return { ...prev, left: nextLeft, top: nextTop };
    });
  };

  const onFloatPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag === null || event.pointerId !== drag.pointerId) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  };

  return (
    <section className={styles.section} aria-labelledby="drag-float-heading">
      <h2 id="drag-float-heading">2. 줄마다 다른 너비 · 드래그 플로트</h2>
      <div className={styles.prose}>
        <p>
          공식 사이트 데모처럼,{" "}
          <strong>
            장애물(이미지·도형) 위치가 바뀌면 줄마다 쓸 수 있는 너비가 달라지는
          </strong>{" "}
          경우에는 <code>layoutNextLine</code>을 반복 호출합니다. 아래는 왼쪽에
          박스가 있을 때 <strong>같은 세로 구간의 줄만 좁은 폭</strong>으로
          깨지는 단순 모델입니다.
        </p>
      </div>

      <p className={styles.dragHint}>
        <strong>박스를 드래그</strong>해 텍스트 줄바꿈이 어떻게 바뀌는지
        확인하세요.
      </p>

      <div className={styles.dragStage} style={{ height: stageHeight }}>
        <div
          className={styles.dragFloat}
          style={{
            left: floatRect.left,
            top: floatRect.top,
            width: floatRect.width,
            height: floatRect.height,
          }}
          onPointerDown={onFloatPointerDown}
          onPointerMove={onFloatPointerMove}
          onPointerUp={onFloatPointerUp}
          onPointerCancel={onFloatPointerUp}
          role="presentation"
        >
          <span className={styles.dragFloatLabel}>drag</span>
        </div>

        <div
          className={styles.dragTextLayer}
          style={{
            width: CONTAINER_WIDTH,
            font: DEMO_FONT,
            lineHeight: `${LINE_HEIGHT}px`,
          }}
        >
          {lines.map((line) => {
            return (
              <div
                key={`${line.y}-${line.maxWidth}-${line.text}`}
                className={styles.dragLine}
                style={{
                  top: line.y,
                  maxWidth: line.maxWidth,
                }}
              >
                {line.text.length > 0 ? line.text : "\u00a0"}
              </div>
            );
          })}
        </div>
      </div>

      <p className={styles.previewCaption}>
        <code>prepareWithSegments</code> 1회 + 커서를 유지한 채{" "}
        <code>layoutNextLine(prepared, cursor, maxWidth)</code> 반복.
      </p>
    </section>
  );
};
