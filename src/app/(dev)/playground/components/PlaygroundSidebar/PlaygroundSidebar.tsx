"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isPlaygroundNavActive,
  NAV_ENTRIES,
} from "@/app/(dev)/playground/config";
import styles from "./PlaygroundSidebar.module.scss";

export function PlaygroundSidebar() {
  const pathname = usePathname() ?? "/";

  return (
    <>
      <p className={styles.sidebarTitle}>Playground</p>
      <nav className={styles.navBlock} aria-label="Playground 섹션">
        <Link className={styles.homeLink} href="/">
          ← 홈
        </Link>
        {NAV_ENTRIES.map((entry) => {
          if (entry.kind === "link") {
            const active = isPlaygroundNavActive(pathname, entry.href);
            return (
              <Link
                key={entry.href}
                href={entry.href}
                className={cn(
                  styles.navLink,
                  active ? styles.navLinkActive : null,
                )}
                aria-current={active ? "page" : undefined}
              >
                {entry.label}
              </Link>
            );
          }

          return (
            <div key={entry.segment}>
              <p className={styles.navGroupLabel}>{entry.segment}</p>
              {entry.items.map((item) => {
                const active = isPlaygroundNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      styles.navLink,
                      styles.navLinkChild,
                      active ? styles.navLinkActive : null,
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
    </>
  );
}
