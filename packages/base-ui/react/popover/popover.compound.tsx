"use client";

import type * as React from "react";
import { PopoverHost, PopoverRoot } from "./components";
import { usePopoverController } from "./popover.hook";
import type {
  PopoverController,
  PopoverPanelEntry,
} from "./popover.types";
import type { PopoverHostProps } from "./components/popover.host";
import type { PopoverRootProps } from "./components/popover.root";

type PopoverCompound = {
  Root: (props: PopoverRootProps) => React.ReactNode;
  Host: (props: PopoverHostProps) => React.ReactNode;
  useController: () => PopoverController;
};

export const Popover: PopoverCompound = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Host: PopoverHost,
  useController: usePopoverController,
});

export namespace Popover {
  export type Controller = PopoverController;
  export type PanelEntry = PopoverPanelEntry;
  export type RootProps = PopoverRootProps;
  export type HostProps = PopoverHostProps;
}

export type { PopoverCompound };
