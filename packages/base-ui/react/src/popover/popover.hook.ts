import * as React from "react";
import { PopoverContext } from "./popover.context";
import type { PopoverController } from "./popover.types";

export const usePopoverController = (): PopoverController => {
  const context = React.useContext(PopoverContext);
  if (context === null) {
    throw new Error(
      "usePopoverController는 Popover.Root 내부에서만 사용할 수 있습니다."
    );
  }
  return context.controller;
};
