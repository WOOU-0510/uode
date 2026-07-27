import { layout, prepare, type PreparedText } from "@uode/base-ui-core";
import * as React from "react";
import styles from "./PretextAccordionSection.module.scss";

const ACCORDION_FONT =
  '15px ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const LINE_HEIGHT_PX = 22;

/** 본문 `.accordionInner`의 padding-top + padding-bottom 과 맞춥니다. */
const INNER_PADDING_Y_PX = 16;

type AccordionItem = {
  id: string;
  title: string;
  text: string;
};

const ACCORDION_ITEMS: readonly AccordionItem[] = [
  {
    id: "ship",
    title: "배송 · 릴리즈 노트",
    text: "릴리즈 노트를 세 줄로 줄였는데, 지원팀 주의 문장이 빠지면 안 된다는 걸 깨닫고 한 문장을 더 넣었다. 그래야 출시 후 깜짝 이슈가 줄어든다.",
  },
  {
    id: "ops",
    title: "운영 인수인계",
    text: "인수인계 문서가 일기처럼 읽히지 않게 체크리스트 형태로 고쳤다. 워커를 재시작하고, 큐가 비는지 확인한 뒤에만 인시던트를 종료한다. 백로그가 다시 불어나면 새 스레드 대신 같은 담당자에게 페이지한다.",
  },
  {
    id: "i18n",
    title: "혼합 텍스트 · URL",
    text: "AGI 春天到了. بدأت الرحلة 🚀 긴 URL은 https://example.com/reports/q3?lang=ar&mode=full 입니다. 숫자는 10\u202F000처럼 얇은 공백을 쓰기도 합니다.",
  },
];

type PretextAccordionSectionProps = Record<string, never>;

export const PretextAccordionSection = (
  props: PretextAccordionSectionProps,
) => {
  const {} = props;

  const reactId = React.useId();
  const widthProbeRef = React.useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = React.useState(0);
  const [openId, setOpenId] = React.useState<string | null>(
    ACCORDION_ITEMS[0]?.id ?? null,
  );

  const preparedList = React.useMemo((): readonly PreparedText[] | null => {
    if (typeof window === "undefined") {
      return null;
    }
    return ACCORDION_ITEMS.map((item) => {
      return prepare(item.text, ACCORDION_FONT);
    });
  }, []);

  React.useLayoutEffect(() => {
    const node = widthProbeRef.current;
    if (node === null) {
      return;
    }

    const applyWidth = () => {
      const width = node.getBoundingClientRect().width;
      setContentWidth(width);
    };

    applyWidth();

    const observer = new ResizeObserver(() => {
      applyWidth();
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  const panelMetrics = React.useMemo(() => {
    if (preparedList === null || contentWidth <= 0) {
      return ACCORDION_ITEMS.map(() => ({
        heightPx: 0,
        lineCount: 0,
        textHeightPx: 0,
      }));
    }
    return preparedList.map((prepared) => {
      const metrics = layout(prepared, contentWidth, LINE_HEIGHT_PX);
      const heightPx = Math.ceil(metrics.height + INNER_PADDING_Y_PX);
      return {
        heightPx,
        lineCount: metrics.lineCount,
        textHeightPx: Math.round(metrics.height),
      };
    });
  }, [preparedList, contentWidth]);

  return (
    <section
      className={styles.section}
      aria-labelledby="pretext-accordion-heading"
    >
      <h2 id="pretext-accordion-heading">4. 아코디언 (prepare + layout)</h2>
      <div className={styles.prose}>
        <p>
          공식 <code>accordion</code> 데모와 같이, 본문 높이를 DOM에 맡기지 않고{" "}
          <code>prepare</code>로 캐시한 뒤{" "}
          <code>layout(prepared, width, lineHeight)</code>로 픽셀 높이를 구해{" "}
          <code>height</code>를 맞춥니다. 창 크기가 바뀌면{" "}
          <code>ResizeObserver</code>로 너비만 다시 읽고 같은{" "}
          <code>prepared</code>에 <code>layout</code>만 반복합니다.
        </p>
      </div>

      <div className={styles.accordionCard}>
        <div className={styles.accordionMeasureRow}>
          <div
            ref={widthProbeRef}
            className={styles.accordionWidthProbe}
            aria-hidden
          />
        </div>
        <div className={styles.accordionList}>
          {ACCORDION_ITEMS.map((item, index) => {
            const panelId = `${reactId}-${item.id}-panel`;
            const metrics = panelMetrics[index] ?? {
              heightPx: 0,
              lineCount: 0,
              textHeightPx: 0,
            };
            const expanded = openId === item.id;
            const bodyHeightPx = expanded ? metrics.heightPx : 0;

            return (
              <div key={item.id} className={styles.accordionItem}>
                <button
                  type="button"
                  className={styles.accordionToggle}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  id={`${reactId}-${item.id}-trigger`}
                  onClick={() => {
                    setOpenId((prev) => {
                      return prev === item.id ? null : item.id;
                    });
                  }}
                >
                  <span className={styles.accordionTitle}>{item.title}</span>
                  <span className={styles.accordionMeta}>
                    {metrics.lineCount}줄 · 본문 {metrics.textHeightPx}px
                  </span>
                  <span
                    className={styles.accordionGlyph}
                    style={{
                      transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                    aria-hidden
                  >
                    ›
                  </span>
                </button>
                <section
                  id={panelId}
                  aria-labelledby={`${reactId}-${item.id}-trigger`}
                  className={styles.accordionBody}
                  style={{ height: `${bodyHeightPx}px` }}
                >
                  <div className={styles.accordionInner}>
                    <p className={styles.accordionCopy}>{item.text}</p>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
