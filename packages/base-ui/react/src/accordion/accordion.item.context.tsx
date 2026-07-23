import * as React from "react";
import type { AccordionItemContextValue } from "./accordion.types";

export const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);
