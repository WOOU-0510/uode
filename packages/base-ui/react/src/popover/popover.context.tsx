import * as React from "react";
import type { PopoverContextValue } from "./popover.types";

export const PopoverContext = React.createContext<PopoverContextValue | null>(
  null
);
