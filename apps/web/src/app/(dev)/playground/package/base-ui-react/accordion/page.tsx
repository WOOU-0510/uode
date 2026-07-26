"use client";

import { Accordion } from "@uode/base-ui-react";
import styles from "./page.module.scss";

type AccordionItem = {
  readonly value: string;
  readonly title: string;
  readonly description: string;
};

const SINGLE_ITEMS: readonly AccordionItem[] = [
  {
    value: "overview",
    title: "Single mode",
    description: "한 항목을 열면 이전에 열린 항목은 닫힙니다.",
  },
  {
    value: "accessibility",
    title: "Accessible markup",
    description:
      "Trigger와 Content는 aria-expanded, aria-controls, aria-labelledby로 연결됩니다.",
  },
];

const MULTIPLE_ITEMS: readonly AccordionItem[] = [
  {
    value: "first",
    title: "First item",
    description: "Multiple mode에서는 여러 항목을 동시에 펼칠 수 있습니다.",
  },
  {
    value: "second",
    title: "Second item",
    description: "각 항목의 상태는 독립적으로 전환됩니다.",
  },
];

type BaseUiReactAccordionPlaygroundPageProps = Record<string, never>;

const BaseUiReactAccordionPlaygroundPage = (
  props: BaseUiReactAccordionPlaygroundPageProps,
) => {
  const {} = props;
  const controlledState = Accordion.useState({
    type: "multiple",
    defaultExpandedValues: ["first"],
  });

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>package / base-ui-react / accordion</h1>
        <p>
          <code>@uode/base-ui-react</code>의 Accordion 컴파운드 API(
          <code>Root</code>, <code>Item</code>, <code>Trigger</code>,{" "}
          <code>Content</code>) 예시입니다.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Unstyled</h2>
        <p>
          Accordion 컴포넌트에 className을 전달하지 않은 기본 HTML 렌더링입니다.
        </p>
        <Accordion.Root defaultExpandedValues={["plain"]}>
          <Accordion.Item value="plain">
            <h3>
              <Accordion.Trigger>Plain trigger</Accordion.Trigger>
            </h3>
            <Accordion.Content>
              <p>
                상태 전환과 접근성 속성만 제공하며 스타일은 포함하지 않습니다.
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </section>

      <section className={styles.section}>
        <h2>Single</h2>
        <p>기본 모드입니다. 한 번에 하나의 항목만 열립니다.</p>
        <Accordion.Root
          className={styles.accordion}
          defaultExpandedValues={["overview"]}
        >
          {SINGLE_ITEMS.map((item) => (
            <Accordion.Item
              key={item.value}
              className={styles.item}
              value={item.value}
            >
              <h3>
                <Accordion.Trigger className={styles.trigger}>
                  {item.title}
                </Accordion.Trigger>
              </h3>
              <Accordion.Content className={styles.content}>
                <p>{item.description}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <section className={styles.section}>
        <h2>Multiple</h2>
        <p>여러 항목을 함께 열 수 있습니다.</p>
        <Accordion.Root className={styles.accordion} type="multiple">
          {MULTIPLE_ITEMS.map((item) => (
            <Accordion.Item
              key={item.value}
              className={styles.item}
              value={item.value}
            >
              <h3>
                <Accordion.Trigger className={styles.trigger}>
                  {item.title}
                </Accordion.Trigger>
              </h3>
              <Accordion.Content className={styles.content}>
                <p>{item.description}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <section className={styles.section}>
        <h2>Nested</h2>
        <p>
          각 Root는 독립적으로 동작합니다. 바깥은 Single, 안쪽은 Multiple입니다.
        </p>
        <Accordion.Root
          className={styles.accordion}
          defaultExpandedValues={["account"]}
        >
          <Accordion.Item className={styles.item} value="account">
            <h3>
              <Accordion.Trigger className={styles.trigger}>
                Account settings
              </Accordion.Trigger>
            </h3>
            <Accordion.Content className={styles.content}>
              <p>하위 설정은 별도 Accordion.Root로 구성됩니다.</p>
              <Accordion.Root
                className={styles.nestedAccordion}
                type="multiple"
                defaultExpandedValues={["profile"]}
              >
                <Accordion.Item className={styles.item} value="profile">
                  <h4>
                    <Accordion.Trigger className={styles.trigger}>
                      Profile
                    </Accordion.Trigger>
                  </h4>
                  <Accordion.Content className={styles.content}>
                    <p>표시 이름과 프로필 이미지를 관리합니다.</p>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item className={styles.item} value="security">
                  <h4>
                    <Accordion.Trigger className={styles.trigger}>
                      Security
                    </Accordion.Trigger>
                  </h4>
                  <Accordion.Content className={styles.content}>
                    <p>비밀번호와 2단계 인증을 관리합니다.</p>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item className={styles.item} value="advanced">
            <h3>
              <Accordion.Trigger className={styles.trigger}>
                Advanced settings
              </Accordion.Trigger>
            </h3>
            <Accordion.Content className={styles.content}>
              <p>바깥 아코디언의 다른 항목입니다.</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </section>

      <section className={styles.section}>
        <h2>외부 상태 hook + motion</h2>
        <p>
          <code>Accordion.useState</code>로 core store를 구독해 Root에 주입하고,
          CSS 변수로 애니메이션 속도와 easing을 바꿉니다.
        </p>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() =>
              controlledState.setExpandedValues(["first", "second"])
            }
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={() => controlledState.setExpandedValues([])}
          >
            Collapse all
          </button>
        </div>
        <Accordion.Root
          className={`${styles.accordion} ${styles.controlledAccordion}`}
          type="multiple"
          expandedValues={controlledState.expandedValues}
          onExpandedValuesChange={controlledState.setExpandedValues}
        >
          {MULTIPLE_ITEMS.map((item) => (
            <Accordion.Item
              key={item.value}
              className={styles.item}
              value={item.value}
            >
              <h3>
                <Accordion.Trigger className={styles.trigger}>
                  {item.title}
                </Accordion.Trigger>
              </h3>
              <Accordion.Content className={styles.content}>
                <p>{item.description}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <section className={styles.section}>
        <h2>Disabled item</h2>
        <p>비활성 항목은 native button의 disabled 상태를 사용합니다.</p>
        <Accordion.Root className={styles.accordion}>
          <Accordion.Item className={styles.item} value="locked" disabled>
            <h3>
              <Accordion.Trigger className={styles.trigger}>
                Disabled item
              </Accordion.Trigger>
            </h3>
            <Accordion.Content className={styles.content}>
              <p>이 내용은 열 수 없습니다.</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </section>
    </main>
  );
};

export default BaseUiReactAccordionPlaygroundPage;
