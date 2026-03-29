"use client";

import { Popover } from "@uode/base-ui-react";
import styles from "./page.module.scss";

type BaseUiReactPopoverPlaygroundPageProps = Record<string, never>;

const BaseUiReactPopoverPlaygroundPage = (
  props: BaseUiReactPopoverPlaygroundPageProps,
) => {
  const {} = props;

  return (
    <Popover.Root>
      <main className={styles.page}>
        <header className={styles.pageHeader}>
          <h1>package / base-ui-react / popover</h1>
          <p>
            <code>@uode/base-ui-react</code>의 Popover 기본
            동작(열기/교체/스택/닫기)을 확인하는 예시입니다.
          </p>
        </header>

        <PopoverExamples />

        <PopoverExampleBackdrop />
        <Popover.Host>
          <PopoverPanelBody />
        </Popover.Host>
      </main>
    </Popover.Root>
  );
};

type PopoverExampleBackdropProps = Record<string, never>;

const PopoverExampleBackdrop = (props: PopoverExampleBackdropProps) => {
  const {} = props;
  const controller = Popover.useController();
  return (
    <Popover.Backdrop onClick={() => controller.closeTopPanel()} />
  );
};

type PopoverExamplesProps = Record<string, never>;

const PopoverExamples = (props: PopoverExamplesProps) => {
  const {} = props;
  const controller = Popover.useController();
  const hasPanel = controller.topEntry !== null;

  return (
    <section className={styles.section}>
      <h2>액션</h2>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.openPanel("intro", {}, { mode: "replace" })}
        >
          Intro 열기(replace)
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            controller.openPanel("details", {}, { mode: "replace" })
          }
        >
          Details 열기(replace)
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.openPanel("details", {}, { mode: "stack" })}
        >
          Details 쌓기(stack)
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.closeTopPanel()}
          disabled={!hasPanel}
        >
          Top 닫기
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.closeAllPanels()}
          disabled={!hasPanel}
        >
          전체 닫기
        </button>
      </div>
    </section>
  );
};

type PopoverPanelBodyProps = Record<string, never>;

const PopoverPanelBody = (props: PopoverPanelBodyProps) => {
  const {} = props;
  const controller = Popover.useController();
  const topEntry = controller.topEntry;

  if (topEntry === null) return null;

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>현재 패널: {topEntry.key}</h2>
      <p className={styles.panelSub}>스택 길이: {controller.entries.length}</p>
      <p className={styles.panelSub}>
        params: {JSON.stringify(topEntry.params ?? null)}
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            controller.openPanel(
              "details",
              { from: topEntry.key, depth: controller.entries.length + 1 },
              { mode: "stack" },
            )
          }
        >
          내부에서 Details 쌓기(stack)
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.closeTopPanel()}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default BaseUiReactPopoverPlaygroundPage;
