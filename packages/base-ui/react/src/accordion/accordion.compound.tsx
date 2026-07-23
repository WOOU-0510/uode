import type * as React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "./components";
import { useAccordionController } from "./accordion.hook";
import type { AccordionController } from "./accordion.types";
import type { AccordionContentProps } from "./components/content";
import type { AccordionItemProps } from "./components/item";
import type { AccordionRootProps } from "./components/root";
import type { AccordionTriggerProps } from "./components/trigger";

export type AccordionCompound = {
  Root: (props: AccordionRootProps) => React.ReactNode;
  Item: (props: AccordionItemProps) => React.ReactNode;
  Trigger: typeof AccordionTrigger;
  Content: (props: AccordionContentProps) => React.ReactNode;
  useController: () => AccordionController;
};

export const Accordion: AccordionCompound = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
  useController: useAccordionController,
});

export namespace Accordion {
  export type Controller = AccordionController;
  export type RootProps = AccordionRootProps;
  export type ItemProps = AccordionItemProps;
  export type TriggerProps = AccordionTriggerProps;
  export type ContentProps = AccordionContentProps;
}
