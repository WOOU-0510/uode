import { describe, expect, test } from "bun:test";
import {
  createAccordionStore,
  createButtonStore,
  createPopoverStore,
  createTreeViewStore,
} from "../src";

describe("base-ui core stores", () => {
  test("button ignores toggle while disabled", () => {
    const store = createButtonStore({ initialDisabled: true });

    store.togglePressed();

    expect(store.getSnapshot()).toEqual({ disabled: true, pressed: false });
  });

  test("single accordion keeps one expanded value", () => {
    const store = createAccordionStore({ type: "single" });

    store.expand("first");
    store.expand("second");

    expect(store.getSnapshot().expandedValues).toEqual(["second"]);
  });

  test("popover replaces or stacks panels", () => {
    const store = createPopoverStore({ idPrefix: "panel" });

    store.openPanel("menu", {});
    store.openPanel("settings", {}, { mode: "stack" });

    expect(store.getSnapshot().entries.map((entry) => entry.key)).toEqual([
      "menu",
      "settings",
    ]);

    store.openPanel("help", {});

    expect(store.getSnapshot().entries.map((entry) => entry.key)).toEqual([
      "help",
    ]);

    store.setEntries([]);

    expect(store.getSnapshot().entries).toEqual([]);
  });

  test("tree view tracks expansion, focus, and selection", () => {
    const store = createTreeViewStore({
      initialExpandedValues: ["notes", "notes"],
    });

    store.setExpanded("projects", true);
    store.setExpanded("notes", false);
    store.setFocusedValue("projects");
    store.setSelectedValue("projects");

    expect(store.getSnapshot()).toEqual({
      expandedValues: ["projects"],
      focusedValue: "projects",
      selectedValue: "projects",
    });
  });
});
