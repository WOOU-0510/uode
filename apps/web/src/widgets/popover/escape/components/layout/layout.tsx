"use client";
import * as React from "react";
import { Popover } from "@uode/base-ui-react";
import { EscapePopoverPanelSwitch } from "../";
import styles from "./layout.module.scss";

type GlobalPopoversLayoutProps = {
  children: React.ReactNode;
};

export const GlobalPopoversLayout = (props: GlobalPopoversLayoutProps) => {
  const { children } = props;

  return (
    <Popover.Root>
      {children}
      <EscapePopoverKeyboardShortcut />
      <EscapePopoverBackdrop />
      <Popover.Host id="uode-escape-popover" className={styles.layer}>
        <EscapePopoverPanelSwitch />
      </Popover.Host>
    </Popover.Root>
  );
};

type EscapePopoverKeyboardShortcutProps = Record<string, never>;

type EscapePopoverBackdropProps = Record<string, never>;

const EscapePopoverBackdrop = (props: EscapePopoverBackdropProps) => {
  const {} = props;
  const controller = Popover.useController();
  return <Popover.Backdrop onClick={() => controller.closeTopPanel()} />;
};

const EscapePopoverKeyboardShortcut = (
  props: EscapePopoverKeyboardShortcutProps
) => {
  const {} = props;
  const controller = Popover.useController();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();

      if (controller.topEntry !== null) {
        controller.closeTopPanel();
        return;
      }

      controller.openPanel("menu", {}, { mode: "replace" });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [controller]);

  return null;
};
