import type * as React from "react";
import type { PlaygroundNavHref } from "@/app/(dev)/playground/config";
import { PlaygroundHubCard } from "./components";
import styles from "./page.module.scss";

const HUB_ITEMS = [
  {
    href: "/playground/lib/icon",
    title: "lib / icon",
    description: "SVGR로 생성된 아이콘을 이름·색·크기로 미리 봅니다.",
  },
  {
    href: "/playground/tauri-api/window",
    title: "tauri-api / window",
    description: "최소화·최대화 토글·닫기 등 현재 창 API를 시험합니다.",
  },
  {
    href: "/playground/tauri-api/health",
    title: "tauri-api / health",
    description: (
      <>
        <code>lab</code> 커맨드(greet, ping, add, echo, 메타데이터)를
        호출합니다.
      </>
    ),
  },
  {
    href: "/playground/package/base-ui-react/popover",
    title: "package / base-ui-react / popover",
    description: "base-ui-react의 Popover 컴파운드 API를 직접 테스트합니다.",
  },
] satisfies readonly {
  href: PlaygroundNavHref;
  title: string;
  description: React.ReactNode;
}[];

type PlaygroundPageProps = Record<string, never>;

const Page = (props: PlaygroundPageProps) => {
  const {} = props;
  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Playground</h1>
        <p>
          제품 코드와 분리된 개발·학습용 샌드박스입니다. UI와 Tauri{" "}
          <code>invoke</code> 실험은 왼쪽 메뉴에서 섹션별로 나뉘어 있습니다.
        </p>
      </header>

      <ul className={styles.cardGrid}>
        {HUB_ITEMS.map((item) => (
          <li key={item.href}>
            <PlaygroundHubCard
              href={item.href}
              title={item.title}
              description={item.description}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Page;
