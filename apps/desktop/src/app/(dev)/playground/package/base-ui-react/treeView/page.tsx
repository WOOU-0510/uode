"use client";

import { TreeView } from "@uode/base-ui-react";
import * as React from "react";
import styles from "./page.module.scss";

type EmptyProps = Record<string, never>;

type ClickExpandableItemProps = Omit<
  TreeView.ItemProps,
  "hasChildren" | "onClick"
> & {
  readonly state: TreeView.State;
};

const ClickExpandableItem = (props: ClickExpandableItemProps) => {
  const { state, value, ...rest } = props;
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(event.target instanceof Element) ||
      event.target.closest('[role="treeitem"]') !== event.currentTarget
    ) {
      return;
    }
    state.setExpanded(value, !state.expandedValues.includes(value));
  };

  return (
    <TreeView.Item {...rest} value={value} hasChildren onClick={handleClick} />
  );
};

const UnstyledTree = (props: EmptyProps) => {
  const {} = props;

  return (
    <TreeView.Root
      aria-label="무스타일 파일"
      defaultExpandedValues={["plain-folder"]}
    >
      <TreeView.Item value="plain-folder" hasChildren>
        폴더
        <TreeView.Group>
          <TreeView.Item value="plain-a">a.md</TreeView.Item>
          <TreeView.Item value="plain-b">b.md</TreeView.Item>
        </TreeView.Group>
      </TreeView.Item>
      <TreeView.Item value="plain-disabled" disabled>
        비활성 파일
      </TreeView.Item>
    </TreeView.Root>
  );
};

const StyledTree = (props: EmptyProps) => {
  const {} = props;

  return (
    <TreeView.Root
      aria-label="스타일 노트"
      className={styles.tree}
      defaultExpandedValues={["styled-notes"]}
      defaultSelectedValue="styled-welcome"
    >
      <TreeView.Item className={styles.item} value="styled-notes" hasChildren>
        <span className={styles.label}>
          <span aria-hidden>📁</span> Notes
        </span>
        <TreeView.Group className={styles.group}>
          <TreeView.Item className={styles.item} value="styled-welcome">
            <span className={styles.label}>
              <span aria-hidden>📄</span> welcome.md
            </span>
          </TreeView.Item>
          <TreeView.Item className={styles.item} value="styled-roadmap">
            <span className={styles.label}>
              <span aria-hidden>📄</span> roadmap.md
            </span>
          </TreeView.Item>
        </TreeView.Group>
      </TreeView.Item>
      <TreeView.Item className={styles.item} value="styled-archive" disabled>
        <span className={styles.label}>
          <span aria-hidden>🔒</span> Archive
        </span>
      </TreeView.Item>
    </TreeView.Root>
  );
};

const HierarchyExamples = (props: EmptyProps) => {
  const {} = props;
  const outlineState = TreeView.useState({
    defaultExpandedValues: ["guide"],
    defaultSelectedValue: "installation",
  });
  const organizationState = TreeView.useState({
    defaultExpandedValues: ["product-team", "engineering"],
    defaultSelectedValue: "frontend",
  });

  return (
    <div className={styles.hierarchyGrid}>
      <article className={styles.hierarchyCard}>
        <h3>문서 목차</h3>
        <p>장과 절을 계층적으로 탐색하는 예시입니다.</p>
        <TreeView.Root
          aria-label="문서 목차"
          className={`${styles.tree} ${styles.compactTree}`}
          expandedValues={outlineState.expandedValues}
          selectedValue={outlineState.selectedValue}
          onExpandedValuesChange={outlineState.setExpandedValues}
          onSelectedValueChange={outlineState.setSelectedValue}
        >
          <ClickExpandableItem
            state={outlineState}
            className={styles.item}
            value="guide"
          >
            <span className={styles.label}>
              <span aria-hidden>1.</span> 시작 가이드
            </span>
            <TreeView.Group className={styles.group}>
              <TreeView.Item className={styles.item} value="installation">
                <span className={styles.label}>1.1 설치</span>
              </TreeView.Item>
              <TreeView.Item className={styles.item} value="shortcuts">
                <span className={styles.label}>1.2 단축키</span>
              </TreeView.Item>
            </TreeView.Group>
          </ClickExpandableItem>
          <ClickExpandableItem
            state={outlineState}
            className={styles.item}
            value="api"
          >
            <span className={styles.label}>
              <span aria-hidden>2.</span> API
            </span>
            <TreeView.Group className={styles.group}>
              <TreeView.Item className={styles.item} value="components">
                <span className={styles.label}>2.1 Components</span>
              </TreeView.Item>
              <TreeView.Item className={styles.item} value="hooks">
                <span className={styles.label}>2.2 Hooks</span>
              </TreeView.Item>
            </TreeView.Group>
          </ClickExpandableItem>
        </TreeView.Root>
      </article>

      <article className={styles.hierarchyCard}>
        <h3>조직도</h3>
        <p>팀과 구성원을 표현하는 비파일 계층 예시입니다.</p>
        <TreeView.Root
          aria-label="조직도"
          className={`${styles.tree} ${styles.compactTree}`}
          expandedValues={organizationState.expandedValues}
          selectedValue={organizationState.selectedValue}
          onExpandedValuesChange={organizationState.setExpandedValues}
          onSelectedValueChange={organizationState.setSelectedValue}
        >
          <ClickExpandableItem
            state={organizationState}
            className={styles.item}
            value="product-team"
          >
            <span className={styles.label}>
              <span aria-hidden>👥</span> Product team
            </span>
            <TreeView.Group className={styles.group}>
              <TreeView.Item className={styles.item} value="design">
                <span className={styles.label}>
                  <span aria-hidden>🎨</span> Design
                </span>
              </TreeView.Item>
              <ClickExpandableItem
                state={organizationState}
                className={styles.item}
                value="engineering"
              >
                <span className={styles.label}>
                  <span aria-hidden>🛠️</span> Engineering
                </span>
                <TreeView.Group className={styles.group}>
                  <TreeView.Item className={styles.item} value="frontend">
                    <span className={styles.label}>Frontend</span>
                  </TreeView.Item>
                  <TreeView.Item className={styles.item} value="backend">
                    <span className={styles.label}>Backend</span>
                  </TreeView.Item>
                </TreeView.Group>
              </ClickExpandableItem>
            </TreeView.Group>
          </ClickExpandableItem>
        </TreeView.Root>
      </article>
    </div>
  );
};

const ComplexContentTree = (props: EmptyProps) => {
  const {} = props;
  const state = TreeView.useState({
    defaultExpandedValues: ["release"],
    defaultSelectedValue: "api-migration",
  });
  const [activity, setActivity] = React.useState(
    "행 안의 액션은 트리 선택 및 확장과 독립적으로 동작합니다.",
  );
  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    message: string,
  ) => {
    event.stopPropagation();
    setActivity(message);
  };
  const handleActionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.complexExample}>
      <TreeView.Root
        aria-label="릴리스 작업 트리"
        className={styles.complexTree}
        expandedValues={state.expandedValues}
        selectedValue={state.selectedValue}
        onExpandedValuesChange={state.setExpandedValues}
        onSelectedValueChange={state.setSelectedValue}
      >
        <ClickExpandableItem
          state={state}
          className={styles.complexItem}
          value="release"
        >
          <div className={`${styles.complexRow} ${styles.parentRow}`}>
            <span className={styles.complexChevron} aria-hidden>
              ›
            </span>
            <span className={styles.complexIcon} aria-hidden>
              R
            </span>
            <div className={styles.complexMain}>
              <div className={styles.complexTitleLine}>
                <strong>Release 1.4</strong>
                <span className={styles.statusBadge} data-tone="progress">
                  진행 중
                </span>
              </div>
              <span className={styles.complexMeta}>
                3개 작업 · 목표일 8월 2일
              </span>
              <progress
                aria-label="릴리스 진행률"
                className={styles.progress}
                max={100}
                value={67}
              />
            </div>
            <button
              type="button"
              className={styles.rowAction}
              onClick={(event) =>
                handleAction(event, "Release 1.4 요약을 열었습니다.")
              }
              onKeyDown={handleActionKeyDown}
            >
              요약
            </button>
          </div>

          <TreeView.Group className={styles.complexGroup}>
            <TreeView.Item className={styles.complexItem} value="design-review">
              <div className={styles.complexRow}>
                <span className={styles.avatar} aria-hidden>
                  MK
                </span>
                <div className={styles.complexMain}>
                  <div className={styles.complexTitleLine}>
                    <strong>디자인 검토</strong>
                    <span className={styles.statusBadge} data-tone="done">
                      완료
                    </span>
                  </div>
                  <span className={styles.complexMeta}>
                    민경 · 체크리스트 8/8
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.rowAction}
                  onClick={(event) =>
                    handleAction(event, "디자인 검토 기록을 확인했습니다.")
                  }
                  onKeyDown={handleActionKeyDown}
                >
                  기록
                </button>
              </div>
            </TreeView.Item>

            <TreeView.Item className={styles.complexItem} value="api-migration">
              <div className={styles.complexRow}>
                <span className={styles.avatar} aria-hidden>
                  JH
                </span>
                <div className={styles.complexMain}>
                  <div className={styles.complexTitleLine}>
                    <strong>API 마이그레이션</strong>
                    <span className={styles.statusBadge} data-tone="risk">
                      확인 필요
                    </span>
                  </div>
                  <span className={styles.complexMeta}>
                    지훈 · 차단 이슈 1개
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.rowAction}
                  onClick={(event) =>
                    handleAction(event, "API 담당자에게 알림을 보냈습니다.")
                  }
                  onKeyDown={handleActionKeyDown}
                >
                  알림
                </button>
              </div>
            </TreeView.Item>

            <TreeView.Item className={styles.complexItem} value="qa">
              <div className={styles.complexRow}>
                <span className={styles.avatar} aria-hidden>
                  QA
                </span>
                <div className={styles.complexMain}>
                  <div className={styles.complexTitleLine}>
                    <strong>회귀 테스트</strong>
                    <span className={styles.statusBadge}>대기</span>
                  </div>
                  <span className={styles.complexMeta}>
                    담당자 미지정 · 테스트 0/12
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.rowAction}
                  onClick={(event) =>
                    handleAction(event, "QA 담당자 지정 화면을 열었습니다.")
                  }
                  onKeyDown={handleActionKeyDown}
                >
                  담당 지정
                </button>
              </div>
            </TreeView.Item>
          </TreeView.Group>
        </ClickExpandableItem>
      </TreeView.Root>

      <output className={styles.activity} aria-live="polite">
        {activity}
      </output>
    </div>
  );
};

const AppliedTree = (props: EmptyProps) => {
  const {} = props;
  const state = TreeView.useState({
    defaultExpandedValues: ["workspace", "notes"],
    defaultFocusedValue: "daily",
    defaultSelectedValue: "daily",
  });

  const selectedLabels: Record<string, string> = {
    workspace: "Workspace",
    notes: "Notes",
    daily: "daily.md",
    ideas: "ideas.md",
    projects: "Projects",
    uode: "uode.md",
    reports: "reports.md",
  };

  return (
    <div className={styles.explorerLayout}>
      <div>
        <div className={styles.toolbar}>
          <button
            type="button"
            onClick={() =>
              state.setExpandedValues(["workspace", "notes", "projects"])
            }
          >
            모두 펼치기
          </button>
          <button type="button" onClick={() => state.setExpandedValues([])}>
            모두 접기
          </button>
          <button
            type="button"
            onClick={() => {
              state.setExpandedValues(["workspace", "projects"]);
              state.setFocusedValue("uode");
              state.setSelectedValue("uode");
            }}
          >
            uode.md로 이동
          </button>
        </div>

        <TreeView.Root
          aria-label="Workspace 탐색기"
          className={`${styles.tree} ${styles.appliedTree}`}
          expandedValues={state.expandedValues}
          focusedValue={state.focusedValue}
          selectedValue={state.selectedValue}
          onExpandedValuesChange={state.setExpandedValues}
          onFocusedValueChange={state.setFocusedValue}
          onSelectedValueChange={state.setSelectedValue}
        >
          <ClickExpandableItem
            state={state}
            className={styles.item}
            value="workspace"
          >
            <span className={styles.label}>
              <span aria-hidden>🗂️</span> Workspace
            </span>
            <TreeView.Group className={styles.group}>
              <ClickExpandableItem
                state={state}
                className={styles.item}
                value="notes"
              >
                <span className={styles.label}>
                  <span aria-hidden>📁</span> Notes
                  <span className={styles.count}>2</span>
                </span>
                <TreeView.Group className={styles.group}>
                  <TreeView.Item className={styles.item} value="daily">
                    <span className={styles.label}>
                      <span aria-hidden>📄</span> daily.md
                    </span>
                  </TreeView.Item>
                  <TreeView.Item className={styles.item} value="ideas">
                    <span className={styles.label}>
                      <span aria-hidden>💡</span> ideas.md
                    </span>
                  </TreeView.Item>
                </TreeView.Group>
              </ClickExpandableItem>
              <ClickExpandableItem
                state={state}
                className={styles.item}
                value="projects"
              >
                <span className={styles.label}>
                  <span aria-hidden>📁</span> Projects
                  <span className={styles.count}>2</span>
                </span>
                <TreeView.Group className={styles.group}>
                  <TreeView.Item className={styles.item} value="uode">
                    <span className={styles.label}>
                      <span aria-hidden>⚛️</span> uode.md
                    </span>
                  </TreeView.Item>
                  <TreeView.Item className={styles.item} value="reports">
                    <span className={styles.label}>
                      <span aria-hidden>📊</span> reports.md
                    </span>
                  </TreeView.Item>
                </TreeView.Group>
              </ClickExpandableItem>
            </TreeView.Group>
          </ClickExpandableItem>
        </TreeView.Root>
      </div>

      <aside className={styles.inspector}>
        <span className={styles.eyebrow}>External store inspector</span>
        <h3>{selectedLabels[state.selectedValue ?? ""] ?? "선택 없음"}</h3>
        <dl>
          <div>
            <dt>selected</dt>
            <dd>{state.selectedValue ?? "null"}</dd>
          </div>
          <div>
            <dt>focused</dt>
            <dd>{state.focusedValue ?? "null"}</dd>
          </div>
          <div>
            <dt>expanded</dt>
            <dd>{state.expandedValues.join(", ") || "없음"}</dd>
          </div>
        </dl>
        <p>
          이 패널은 TreeView 밖에서 동일한 core store snapshot을 구독합니다.
        </p>
      </aside>
    </div>
  );
};

type TreeViewPlaygroundPageProps = Record<string, never>;

const TreeViewPlaygroundPage = (props: TreeViewPlaygroundPageProps) => {
  const {} = props;

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>package / base-ui-react / treeView</h1>
        <p>
          무스타일 구조, 스타일 적용, 외부 core store 구독과 제어를 단계별로
          확인합니다. 방향키, Home, End, Enter와 Space를 사용할 수 있습니다.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Unstyled</h2>
        <p>
          className 없이 role, ARIA 상태와 keyboard 동작만 제공하는 기본
          예시입니다.
        </p>
        <div className={styles.exampleBody}>
          <UnstyledTree />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Styled</h2>
        <p>
          같은 primitive에 focus, selected, expanded, disabled 상태 스타일을
          적용합니다.
        </p>
        <div className={styles.exampleBody}>
          <StyledTree />
        </div>
      </section>

      <section className={styles.section}>
        <h2>파일 외 계층 데이터</h2>
        <p>
          TreeView는 폴더 전용이 아닙니다. 문서 목차와 조직도에서도 부모 행을
          클릭해 하위 항목을 열고 닫을 수 있습니다.
        </p>
        <HierarchyExamples />
      </section>

      <section className={styles.section}>
        <h2>복합 UI 행</h2>
        <p>
          TreeView.Item의 children에는 텍스트뿐 아니라 상태 배지, 진행률,
          메타데이터와 독립 액션도 조합할 수 있습니다.
        </p>
        <ComplexContentTree />
      </section>

      <section className={styles.section}>
        <h2>외부 상태 hook + 파일 탐색기 응용</h2>
        <p>
          <code>TreeView.useState</code>의 snapshot과 setter를 Root에 주입하고,
          Root 밖의 toolbar와 inspector에서도 같은 상태를 사용합니다.
        </p>
        <AppliedTree />
      </section>
    </main>
  );
};

export default TreeViewPlaygroundPage;
