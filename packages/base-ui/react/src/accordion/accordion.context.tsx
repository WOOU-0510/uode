import * as React from "react";
import type { AccordionContextValue } from "./accordion.types";

export const AccordionContext =
  React.createContext<AccordionContextValue | null>(null);
