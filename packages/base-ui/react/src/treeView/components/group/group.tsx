import type * as React from "react";
import { useTreeViewItem } from "../../treeView.item.hook";

export type TreeViewGroupProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "hidden" | "role"
>;

type TreeViewGroupComponentProps = TreeViewGroupProps;

export const TreeViewGroup = (props: TreeViewGroupComponentProps) => {
  const itemContext = useTreeViewItem();

  // biome-ignore lint/a11y/useSemanticElements: WAI-ARIA tree pattern requires role="group".
  return <div {...props} role="group" hidden={!itemContext.expanded} />;
};
