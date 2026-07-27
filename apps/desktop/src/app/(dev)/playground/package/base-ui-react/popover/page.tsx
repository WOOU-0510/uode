"use client";

import { Popover } from "@uode/base-ui-react";
import * as React from "react";
import styles from "./page.module.scss";

type EmptyProps = Record<string, never>;

const PlainPopoverExample = (props: EmptyProps) => {
  const {} = props;
  const controller = Popover.useController();

  return (
    <>
      <button
        type="button"
        onClick={() => controller.openPanel("plain", { styled: false })}
      >
        기본 패널 열기
      </button>
      <Popover.Host>
        {controller.topEntry === null ? null : (
          <div>
            <p>className을 전달하지 않은 native popover입니다.</p>
            <button type="button" onClick={controller.closeTopPanel}>
              닫기
            </button>
          </div>
        )}
      </Popover.Host>
    </>
  );
};

const StyledPopoverExample = (props: EmptyProps) => {
  const {} = props;
  const controller = Popover.useController();

  return (
    <>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            controller.openPanel(
              "profile",
              { user: "uode" },
              { mode: "replace" },
            )
          }
        >
          프로필 열기
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            controller.openPanel(
              "notifications",
              { unread: 3 },
              { mode: "replace" },
            )
          }
        >
          알림으로 교체
        </button>
      </div>
      <Popover.Backdrop
        className={styles.backdrop}
        onClick={controller.closeTopPanel}
      />
      <Popover.Host className={styles.cardPopover}>
        {controller.topEntry === null ? null : (
          <article className={styles.card}>
            <span className={styles.eyebrow}>Styled example</span>
            <h3>{controller.topEntry.key}</h3>
            <p>{JSON.stringify(controller.topEntry.params)}</p>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={controller.closeTopPanel}
            >
              확인
            </button>
          </article>
        )}
      </Popover.Host>
    </>
  );
};

type PositionPanelKey = "center" | "top-right";

const isPositionPanelKey = (
  value: string | undefined,
): value is PositionPanelKey => value === "center" || value === "top-right";

type PositionPanelContentProps = {
  readonly panelKey: PositionPanelKey;
  readonly onClose: () => void;
};

const PositionPanelContent = (props: PositionPanelContentProps) => {
  const { panelKey, onClose } = props;

  switch (panelKey) {
    case "center":
      return (
        <article className={styles.positionPanel}>
          <span className={styles.eyebrow}>Centered panel</span>
          <h3>화면 중앙 배치</h3>
          <p>같은 Host를 fixed 중앙 좌표에 배치한 예시입니다.</p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onClose}
          >
            확인
          </button>
        </article>
      );
    case "top-right":
      return (
        <article className={styles.positionPanel}>
          <span className={styles.eyebrow}>Notification</span>
          <h3>동기화가 완료되었습니다</h3>
          <p>backdrop 없이 우측 상단에 배치할 수도 있습니다.</p>
          <button type="button" className={styles.button} onClick={onClose}>
            닫기
          </button>
        </article>
      );
  }
};

const PositionedPopoverExample = (props: EmptyProps) => {
  const {} = props;
  const controller = Popover.useController();
  const topEntryKey = controller.topEntry?.key;
  const panelKey = isPositionPanelKey(topEntryKey) ? topEntryKey : undefined;

  return (
    <>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.openPanel("center", {})}
        >
          중앙 패널
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => controller.openPanel("top-right", {})}
        >
          우측 상단 알림
        </button>
      </div>

      {panelKey === "center" ? (
        <Popover.Backdrop
          className={styles.backdrop}
          onClick={controller.closeTopPanel}
        />
      ) : null}

      <Popover.Host
        className={styles.positionedPopover}
        data-position={panelKey}
      >
        {panelKey === undefined ? null : (
          <PositionPanelContent
            panelKey={panelKey}
            onClose={controller.closeTopPanel}
          />
        )}
      </Popover.Host>
    </>
  );
};

type SheetDirection = "top" | "right" | "bottom" | "left";
type SheetPanelKey = `sheet-${SheetDirection}`;

const isSheetPanelKey = (value: string | undefined): value is SheetPanelKey =>
  value === "sheet-top" ||
  value === "sheet-right" ||
  value === "sheet-bottom" ||
  value === "sheet-left";

type SheetPanelContentProps = {
  readonly direction: SheetDirection;
  readonly onClose: () => void;
};

const SheetPanelContent = (props: SheetPanelContentProps) => {
  const { direction, onClose } = props;

  const content = {
    top: {
      eyebrow: "Top sheet",
      title: "동기화 진행 상황",
      description: "화면 상단에서 현재 작업의 진행 상황을 알립니다.",
    },
    right: {
      eyebrow: "Right sheet",
      title: "항목 세부 정보",
      description: "본문을 유지한 채 선택한 항목을 옆에서 확인합니다.",
    },
    bottom: {
      eyebrow: "Bottom sheet",
      title: "빠른 작업",
      description: "작은 화면에서도 접근하기 쉬운 작업 목록을 제공합니다.",
    },
    left: {
      eyebrow: "Left sheet",
      title: "워크스페이스 이동",
      description: "현재 화면 위에 보조 탐색 영역을 표시합니다.",
    },
  } satisfies Record<
    SheetDirection,
    { eyebrow: string; title: string; description: string }
  >;
  const current = content[direction];

  return (
    <article className={styles.sheetPanel}>
      <span className={styles.eyebrow}>{current.eyebrow}</span>
      <h3>{current.title}</h3>
      <p>{current.description}</p>
      <div className={styles.sheetActions}>
        <button type="button" className={styles.button}>
          보조 작업
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </article>
  );
};

const AnimatedSheetExample = (props: EmptyProps) => {
  const {} = props;
  const controller = Popover.useController();
  const [isClosing, setIsClosing] = React.useState(false);
  const topEntryKey = controller.topEntry?.key;
  const sheetKey = isSheetPanelKey(topEntryKey) ? topEntryKey : undefined;
  const direction = sheetKey?.replace("sheet-", "") as
    | SheetDirection
    | undefined;

  const openSheet = (nextDirection: SheetDirection) => {
    setIsClosing(false);
    controller.openPanel(`sheet-${nextDirection}`, {});
  };
  const requestClose = () => {
    setIsClosing(true);
  };
  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !isClosing) return;
    setIsClosing(false);
    controller.closeTopPanel();
  };

  return (
    <>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => openSheet("top")}
        >
          상단 시트
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => openSheet("right")}
        >
          우측 시트
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => openSheet("bottom")}
        >
          하단 시트
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => openSheet("left")}
        >
          좌측 시트
        </button>
      </div>

      {direction === undefined ? null : (
        <Popover.Backdrop
          className={styles.animatedBackdrop}
          data-state={isClosing ? "closed" : "open"}
          onClick={requestClose}
        />
      )}

      <Popover.Host
        aria-label={
          direction === undefined ? undefined : `${direction} sheet example`
        }
        className={styles.sheetPopover}
        data-direction={direction}
        data-state={isClosing ? "closed" : "open"}
        onAnimationEnd={handleAnimationEnd}
      >
        {direction === undefined ? null : (
          <SheetPanelContent direction={direction} onClose={requestClose} />
        )}
      </Popover.Host>
    </>
  );
};

type WorkspacePanelProps = {
  readonly state: Popover.State;
};

const WorkspacePanel = (props: WorkspacePanelProps) => {
  const { state } = props;
  const controller = Popover.useController();
  const topEntry = controller.topEntry;

  if (topEntry === null) return null;

  return (
    <article className={styles.workspacePanel}>
      <header className={styles.panelHeader}>
        <div>
          <span className={styles.eyebrow}>Workspace panel</span>
          <h3>{topEntry.key}</h3>
        </div>
        <span className={styles.depthBadge}>
          depth {controller.entries.length}
        </span>
      </header>

      <p className={styles.panelDescription}>
        외부 hook의 entries와 Root 내부 controller가 같은 상태를 사용합니다.
      </p>
      <pre className={styles.params}>
        {JSON.stringify(topEntry.params, null, 2)}
      </pre>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            controller.openPanel(
              "keyboard-shortcuts",
              { from: topEntry.key },
              { mode: "stack" },
            )
          }
        >
          단축키 패널 쌓기
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={controller.closeTopPanel}
        >
          이전 패널
        </button>
        <button
          type="button"
          className={styles.dangerButton}
          onClick={state.closeAllPanels}
        >
          전체 닫기
        </button>
      </div>
    </article>
  );
};

type BaseUiReactPopoverPlaygroundPageProps = Record<string, never>;

const BaseUiReactPopoverPlaygroundPage = (
  props: BaseUiReactPopoverPlaygroundPageProps,
) => {
  const {} = props;
  const workspaceState = Popover.useState({
    idPrefix: "workspace-panel",
  });

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>package / base-ui-react / popover</h1>
        <p>
          무스타일 native 렌더링, 스타일 적용, replace/stack 동작과 외부 상태
          hook 주입을 각각 확인합니다.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Unstyled</h2>
        <p>
          Popover 컴포넌트에 className을 전달하지 않은 기본 브라우저
          렌더링입니다.
        </p>
        <div className={styles.exampleBody}>
          <Popover.Root>
            <PlainPopoverExample />
          </Popover.Root>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Styled replace</h2>
        <p>
          동일한 primitive에 카드와 backdrop 스타일을 적용하고, 열린 패널을 다른
          패널로 교체합니다.
        </p>
        <Popover.Root>
          <StyledPopoverExample />
        </Popover.Root>
      </section>

      <section className={styles.section}>
        <h2>CSS 위치 주입</h2>
        <p>
          Popover는 위치 mode를 소유하지 않습니다. Host에 전달한 className과
          data 속성만으로 중앙 패널과 우측 상단 알림을 구성합니다.
        </p>
        <Popover.Root>
          <PositionedPopoverExample />
        </Popover.Root>
      </section>

      <section className={styles.section}>
        <h2>Animated sheets</h2>
        <p>
          같은 Host를 상·하·좌·우에 고정하고, <code>@uode/styles</code>의
          slide/fade mixin으로 진입·퇴장 효과를 적용합니다.
        </p>
        <Popover.Root>
          <AnimatedSheetExample />
        </Popover.Root>
      </section>

      <section className={styles.section}>
        <h2>외부 상태 hook + stack 응용</h2>
        <p>
          <code>Popover.useState</code>가 core store를 구독합니다. Root에는
          entries와 setter만 주입하며, Root 밖의 도구 모음에서도 같은 상태를
          제어합니다.
        </p>

        <div className={styles.stateGrid}>
          <dl className={styles.stateCard}>
            <div>
              <dt>열린 패널</dt>
              <dd>{workspaceState.topEntry?.key ?? "없음"}</dd>
            </div>
            <div>
              <dt>스택 깊이</dt>
              <dd>{workspaceState.entries.length}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() =>
                workspaceState.openPanel("workspace-settings", {
                  section: "appearance",
                })
              }
            >
              설정 열기
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                workspaceState.openPanel(
                  "command-palette",
                  { query: "" },
                  { mode: "stack" },
                )
              }
            >
              외부에서 패널 쌓기
            </button>
            <button
              type="button"
              className={styles.button}
              disabled={workspaceState.topEntry === null}
              onClick={workspaceState.closeTopPanel}
            >
              Top 닫기
            </button>
          </div>
        </div>

        <Popover.Root
          entries={workspaceState.entries}
          onEntriesChange={workspaceState.setEntries}
        >
          <Popover.Backdrop
            className={styles.backdrop}
            onClick={workspaceState.closeTopPanel}
          />
          <Popover.Host className={styles.workspacePopover}>
            <WorkspacePanel state={workspaceState} />
          </Popover.Host>
        </Popover.Root>
      </section>
    </main>
  );
};

export default BaseUiReactPopoverPlaygroundPage;
