export const getAvailableTreeItems = (root: HTMLDivElement): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>('[role="treeitem"]')).filter(
    (item) =>
      item.getAttribute("aria-disabled") !== "true" &&
      item.closest("[hidden]") === null,
  );
