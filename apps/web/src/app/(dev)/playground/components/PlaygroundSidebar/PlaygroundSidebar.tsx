"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isPlaygroundNavActive,
  type PlaygroundNavEntry,
  type PlaygroundNavGroup,
  type PlaygroundNavLink,
  NAV_ENTRIES,
} from "@/app/(dev)/playground/config";
import styles from "./PlaygroundSidebar.module.scss";

type PlaygroundSidebarProps = Record<string, never>;

export const PlaygroundSidebar = (props: PlaygroundSidebarProps) => {
  const {} = props;
  const pathname = usePathname() ?? "/";

  const renderLinkEntry = (entry: PlaygroundNavLink, depth: number) => {
    const active = isPlaygroundNavActive(pathname, entry.href);
    const isChild = depth > 0;
    return (
      <Link
        key={entry.href}
        href={entry.href}
        className={cn(
          styles.navLink,
          isChild ? styles.navLinkChild : null,
          active ? styles.navLinkActive : null,
        )}
        aria-current={active ? "page" : undefined}
      >
        {entry.label}
      </Link>
    );
  };

  const renderGroupEntry = (entry: PlaygroundNavGroup, depth: number) => {
    return (
      <div key={`${entry.segment}-${depth}`}>
        <p className={styles.navGroupLabel}>{entry.segment}</p>
        {entry.items.map((item) => renderEntry(item, depth + 1))}
      </div>
    );
  };

  const renderEntry = (entry: PlaygroundNavEntry, depth: number) => {
    if (entry.kind === "link") {
      return renderLinkEntry(entry, depth);
    }
    return renderGroupEntry(entry, depth);
  };

  return (
    <>
      <p className={styles.sidebarTitle}>Playground</p>
      <nav className={styles.navBlock} aria-label="Playground 섹션">
        <Link className={styles.homeLink} href="/">
          ← 홈
        </Link>
        {NAV_ENTRIES.map((entry) => renderEntry(entry, 0))}
      </nav>
    </>
  );
};
