"use client";

import { TreeView } from "@uode/base-ui-react";
import cn from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type * as React from "react";
import {
  isPlaygroundNavActive,
  type PlaygroundNavEntry,
  type PlaygroundNavGroup,
  type PlaygroundNavLink,
  NAV_ENTRIES,
  normalizePlaygroundPath,
} from "@/app/(dev)/playground/config";
import styles from "./PlaygroundSidebar.module.scss";

const DEFAULT_EXPANDED_GROUPS = [
  "group:tauri-api",
  "group:package",
  "group:base-ui-react",
];

type PlaygroundSidebarProps = Record<string, never>;

export const PlaygroundSidebar = (props: PlaygroundSidebarProps) => {
  const {} = props;
  const pathname = usePathname() ?? "/";
  const selectedValue = normalizePlaygroundPath(pathname);
  const router = useRouter();
  const treeState = TreeView.useState({
    defaultExpandedValues: DEFAULT_EXPANDED_GROUPS,
    defaultFocusedValue: selectedValue,
  });

  const renderLinkEntry = (entry: PlaygroundNavLink, depth: number) => {
    const active = isPlaygroundNavActive(pathname, entry.href);
    return (
      <TreeView.Item
        key={entry.href}
        className={styles.navItem}
        value={entry.href}
        onKeyDown={(event) => {
          if (event.target === event.currentTarget && event.key === "Enter") {
            router.push(entry.href);
          }
        }}
      >
        <Link
          href={entry.href}
          className={cn(
            styles.navLink,
            depth > 0 ? styles.navLinkChild : null,
            active ? styles.navLinkActive : null,
          )}
          aria-current={active ? "page" : undefined}
        >
          <span className={styles.navMarker} aria-hidden />
          {entry.label}
        </Link>
      </TreeView.Item>
    );
  };

  const renderGroupEntry = (entry: PlaygroundNavGroup, depth: number) => {
    const value = `group:${entry.segment}`;
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        !(event.target instanceof Element) ||
        event.target.closest('[role="treeitem"]') !== event.currentTarget
      ) {
        return;
      }
      treeState.setExpanded(value, !treeState.expandedValues.includes(value));
    };

    return (
      <TreeView.Item
        key={value}
        className={styles.navGroupItem}
        value={value}
        hasChildren
        onClick={handleClick}
      >
        <div className={styles.navGroupLabel}>
          <span className={styles.navChevron} aria-hidden>
            ›
          </span>
          <span>{entry.segment}</span>
          <span className={styles.navCount}>{entry.items.length}</span>
        </div>
        <TreeView.Group className={styles.navGroup}>
          {entry.items.map((item) => renderEntry(item, depth + 1))}
        </TreeView.Group>
      </TreeView.Item>
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
        <TreeView.Root
          aria-label="Playground 메뉴 트리"
          className={styles.navTree}
          expandedValues={treeState.expandedValues}
          focusedValue={treeState.focusedValue}
          selectedValue={selectedValue}
          onExpandedValuesChange={treeState.setExpandedValues}
          onFocusedValueChange={treeState.setFocusedValue}
        >
          {NAV_ENTRIES.map((entry) => renderEntry(entry, 0))}
        </TreeView.Root>
      </nav>
    </>
  );
};
