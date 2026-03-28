import type * as React from "react";
import { PopoverBackdrop, PopoverHost, PopoverRoot } from "./components";
import { usePopoverController } from "./popover.hook";
import type { PopoverPanelEntry } from "@uode/base-ui-core";
import type { PopoverController } from "./popover.types";
import type { PopoverBackdropProps } from "./components/backdrop";
import type { PopoverHostProps } from "./components/host";
import type { PopoverRootProps } from "./components/root";

type PopoverCompound = {
  Root: (props: PopoverRootProps) => React.ReactNode;
  Backdrop: (props: PopoverBackdropProps) => React.ReactNode;
  Host: (props: PopoverHostProps) => React.ReactNode;
  useController: () => PopoverController;
};

export const Popover: PopoverCompound = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Backdrop: PopoverBackdrop,
  Host: PopoverHost,
  useController: usePopoverController,
});

export namespace Popover {
  export type Controller = PopoverController;
  export type PanelEntry = PopoverPanelEntry;
  export type RootProps = PopoverRootProps;
  export type BackdropProps = PopoverBackdropProps;
  export type HostProps = PopoverHostProps;
}

export type { PopoverCompound };
