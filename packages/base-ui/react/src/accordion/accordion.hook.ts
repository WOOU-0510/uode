import * as React from "react";
import { AccordionContext } from "./accordion.context";
import type { AccordionController } from "./accordion.types";

export const useAccordionController = (): AccordionController => {
  const context = React.use(AccordionContext);
  if (context === null) {
    throw new Error(
      "useAccordionController는 Accordion.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  return context.controller;
};
