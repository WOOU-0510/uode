import * as React from "react";
import { AccordionItemContext } from "./accordion.item.context";
import type { AccordionItemContextValue } from "./accordion.types";

export const useAccordionItem = (): AccordionItemContextValue => {
  const context = React.use(AccordionItemContext);
  if (context === null) {
    throw new Error(
      "Accordion.Item의 하위 컴포넌트는 Accordion.Item 내부에서만 사용할 수 있습니다.",
    );
  }
  return context;
};
