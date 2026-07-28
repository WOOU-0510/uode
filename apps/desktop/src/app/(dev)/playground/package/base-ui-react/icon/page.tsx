"use client";

import ArrowRangeIcon from "@uode/base-ui-react/icons/arrow_range";
import FolderOutlinedIcon from "@uode/base-ui-react/icons/folder_outlined";
import TauriIcon from "@uode/base-ui-react/icons/tauri";
import ViteIcon from "@uode/base-ui-react/icons/vite";
import * as React from "react";
import { IconPlaygroundGrid } from "./components";
import { IconPlaygroundStoreProvider } from "./model";
import styles from "./page.module.scss";

const FILTERS = {
  none: "none",
  shadow: "drop-shadow(0 0.45rem 0.35rem rgb(99 72 214 / 35%)) saturate(1.25)",
  grayscale: "grayscale(1)",
  hue: "hue-rotate(120deg)",
} as const;

const INSTANCE_KEYS = ["first", "second", "third", "fourth"] as const;

type FilterName = keyof typeof FILTERS;

type IconStyle = React.CSSProperties & {
  "--icon-animation-duration"?: string;
  "--icon-color-1"?: string;
  "--icon-color-2"?: string;
};

type IconPlaygroundPageProps = Record<string, never>;

const Page = (props: IconPlaygroundPageProps) => {
  const {} = props;
  const [sizePx, setSizePx] = React.useState(56);
  const [monoColor, setMonoColor] = React.useState("#6f8cff");
  const [palette, setPalette] = React.useState({
    primary: "#ff6b8a",
    secondary: "#7968ff",
  });
  const [filterName, setFilterName] = React.useState<FilterName>("shadow");
  const [animated, setAnimated] = React.useState(true);
  const [animationSeconds, setAnimationSeconds] = React.useState(1.8);
  const [instanceCount, setInstanceCount] = React.useState(2);
  const iconSizeStyle: React.CSSProperties = {
    width: sizePx,
    height: sizePx,
  };
  const paletteStyle: IconStyle = {
    ...iconSizeStyle,
    "--icon-color-1": palette.primary,
    "--icon-color-2": palette.secondary,
  };
  const animationStyle: IconStyle = {
    ...iconSizeStyle,
    "--icon-animation-duration": `${animationSeconds}s`,
  };

  return (
    <IconPlaygroundStoreProvider>
      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <h1>package / base-ui-react / icon</h1>
          <p>
            <code>@uode/assets/icons</code>를 원본으로 생성한 아이콘의 단색,
            다색 palette, filter와 stroke animation 동작을 확인합니다.
          </p>
        </header>

        <section className={styles.section}>
          <h2>개별 import · 표현 기능</h2>
          <p>
            개별 경로로 import하면 사용한 아이콘만 번들에 포함됩니다. 다색
            아이콘은 원래 palette를 보존하고 <code>--icon-color-n</code>으로
            필요한 색만 덮어쓸 수 있습니다.
          </p>
          <div className={styles.sectionControls}>
            <label htmlFor="direct-icon-size">
              공통 크기 <output>{sizePx}px</output>
            </label>
            <input
              id="direct-icon-size"
              type="range"
              min={24}
              max={112}
              value={sizePx}
              onChange={(event) => setSizePx(Number(event.currentTarget.value))}
            />
          </div>
          <div className={styles.capabilityGrid}>
            <article className={styles.capabilityCard}>
              <strong>단색 · currentColor</strong>
              <div className={styles.preview}>
                <FolderOutlinedIcon
                  className={styles.monoIcon}
                  style={{ ...iconSizeStyle, color: monoColor }}
                />
              </div>
              <label className={styles.control} htmlFor="mono-color">
                색상
                <input
                  id="mono-color"
                  type="color"
                  value={monoColor}
                  onChange={(event) => setMonoColor(event.currentTarget.value)}
                />
              </label>
            </article>
            <article className={styles.capabilityCard}>
              <strong>다색 · palette override</strong>
              <div className={styles.preview}>
                <TauriIcon style={paletteStyle} />
              </div>
              <div className={styles.paletteControls}>
                <label className={styles.control} htmlFor="palette-primary">
                  color 1
                  <input
                    id="palette-primary"
                    type="color"
                    value={palette.primary}
                    onChange={(event) => {
                      const primary = event.currentTarget.value;
                      setPalette((current) => ({ ...current, primary }));
                    }}
                  />
                </label>
                <label className={styles.control} htmlFor="palette-secondary">
                  color 2
                  <input
                    id="palette-secondary"
                    type="color"
                    value={palette.secondary}
                    onChange={(event) => {
                      const secondary = event.currentTarget.value;
                      setPalette((current) => ({ ...current, secondary }));
                    }}
                  />
                </label>
              </div>
            </article>
            <article className={styles.capabilityCard}>
              <strong>root filter</strong>
              <div className={styles.preview}>
                <ViteIcon
                  style={{ ...iconSizeStyle, filter: FILTERS[filterName] }}
                />
              </div>
              <label className={styles.control} htmlFor="icon-filter">
                필터
                <select
                  id="icon-filter"
                  value={filterName}
                  onChange={(event) =>
                    setFilterName(event.currentTarget.value as FilterName)
                  }
                >
                  <option value="none">없음</option>
                  <option value="shadow">그림자 + 채도</option>
                  <option value="grayscale">흑백</option>
                  <option value="hue">색조 회전</option>
                </select>
              </label>
            </article>
            <article className={styles.capabilityCard}>
              <strong>stroke animation</strong>
              <div className={styles.preview}>
                <ArrowRangeIcon
                  className={styles.strokeIcon}
                  data-animated={animated || undefined}
                  style={animationStyle}
                />
              </div>
              <label className={styles.checkboxControl}>
                <input
                  type="checkbox"
                  checked={animated}
                  onChange={(event) => setAnimated(event.currentTarget.checked)}
                />
                animation
              </label>
              <label className={styles.control} htmlFor="animation-speed">
                재생 시간 <output>{animationSeconds.toFixed(1)}초</output>
                <input
                  id="animation-speed"
                  type="range"
                  min={0.5}
                  max={4}
                  step={0.1}
                  value={animationSeconds}
                  disabled={!animated}
                  onChange={(event) =>
                    setAnimationSeconds(Number(event.currentTarget.value))
                  }
                />
              </label>
            </article>
            <article className={styles.capabilityCard}>
              <strong>반복 instance · 고유 SVG id</strong>
              <div className={styles.preview}>
                <span className={styles.repeatedIcons}>
                  {INSTANCE_KEYS.slice(0, instanceCount).map((key) => (
                    <ViteIcon key={key} style={iconSizeStyle} />
                  ))}
                </span>
              </div>
              <label className={styles.control} htmlFor="instance-count">
                인스턴스 <output>{instanceCount}개</output>
                <input
                  id="instance-count"
                  type="range"
                  min={1}
                  max={4}
                  value={instanceCount}
                  onChange={(event) =>
                    setInstanceCount(Number(event.currentTarget.value))
                  }
                />
              </label>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <h2>문자열 registry · opt-in</h2>
          <p>
            런타임에 이름으로 아이콘을 고를 때만 registry 경로를 사용합니다. 이
            방식은 목록 전체를 포함하므로 아래 편집기처럼 실제로 동적 선택이
            필요할 때 적합합니다.
          </p>
          <IconPlaygroundGrid />
        </section>
      </main>
    </IconPlaygroundStoreProvider>
  );
};

export default Page;
