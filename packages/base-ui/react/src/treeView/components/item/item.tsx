import * as React from "react";
import { assignRef } from "../../../utils/assignRef";
import { getAvailableTreeItems } from "../../treeView.dom";
import { useTreeViewContext } from "../../treeView.hook";
import { TreeViewItemContext } from "../../treeView.item.context";
import type { TreeViewItemContextValue } from "../../treeView.types";

export type TreeViewItemProps = Omit<
  React.ComponentPropsWithRef<"div">,
  | "aria-disabled"
  | "aria-expanded"
  | "aria-selected"
  | "onSelect"
  | "role"
  | "tabIndex"
> & {
  readonly disabled?: boolean;
  readonly hasChildren?: boolean;
  readonly value: string;
};

type TreeViewItemComponentProps = TreeViewItemProps;

export const TreeViewItem = (props: TreeViewItemComponentProps) => {
  const {
    children,
    disabled = false,
    hasChildren = false,
    onClick,
    onFocus,
    onKeyDown,
    ref,
    value,
    ...rest
  } = props;
  const { controller, rootRef } = useTreeViewContext();
  const expanded = controller.expandedValues.includes(value);
  const selected = controller.selectedValue === value;
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      assignRef(ref, node);
      if (
        node !== null &&
        !disabled &&
        controller.focusedValue === null &&
        rootRef.current !== null &&
        getAvailableTreeItems(rootRef.current)[0] === node
      ) {
        controller.setFocusedValue(value);
      }
    },
    [controller, disabled, ref, rootRef, value],
  );
  const focusItem = (item: HTMLElement | undefined) => {
    if (item === undefined) return;
    const nextValue = item.dataset.treeValue;
    if (nextValue !== undefined) {
      controller.setFocusedValue(nextValue);
    }
    item.focus();
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      disabled ||
      (event.target as Element).closest('[role="treeitem"]') !==
        event.currentTarget
    ) {
      return;
    }
    controller.setFocusedValue(value);
    controller.select(value);
  };
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(event);
    if (!event.defaultPrevented && event.target === event.currentTarget) {
      controller.setFocusedValue(value);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;

    const root = rootRef.current;
    if (root === null) return;
    const items = getAvailableTreeItems(root);
    const currentIndex = items.indexOf(event.currentTarget);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(items[currentIndex + 1]);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(items[currentIndex - 1]);
        break;
      case "Home":
        event.preventDefault();
        focusItem(items[0]);
        break;
      case "End":
        event.preventDefault();
        focusItem(items.at(-1));
        break;
      case "ArrowRight": {
        if (!hasChildren) break;
        event.preventDefault();
        if (!expanded) {
          controller.setExpanded(value, true);
          break;
        }
        const firstChild = event.currentTarget.querySelector<HTMLElement>(
          ':scope > [role="group"] > [role="treeitem"]',
        );
        focusItem(firstChild ?? undefined);
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        if (hasChildren && expanded) {
          controller.setExpanded(value, false);
          break;
        }
        const parentItem =
          event.currentTarget.parentElement?.closest<HTMLElement>(
            '[role="treeitem"]',
          );
        focusItem(parentItem ?? undefined);
        break;
      }
      case "Enter":
      case " ":
        event.preventDefault();
        controller.select(value);
        break;
    }
  };
  const contextValue = React.useMemo(
    (): TreeViewItemContextValue => ({ expanded }),
    [expanded],
  );

  return (
    <TreeViewItemContext value={contextValue}>
      <div
        {...rest}
        ref={setRef}
        role="treeitem"
        tabIndex={controller.focusedValue === value ? 0 : -1}
        aria-disabled={disabled || undefined}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={selected}
        data-disabled={disabled ? "" : undefined}
        data-state={hasChildren ? (expanded ? "open" : "closed") : undefined}
        data-tree-value={value}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </TreeViewItemContext>
  );
};
