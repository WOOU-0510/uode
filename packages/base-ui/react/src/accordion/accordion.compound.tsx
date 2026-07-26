import type * as React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "./components";
import { useAccordionController, useAccordionState } from "./accordion.hook";
import type {
  AccordionController,
  AccordionState,
  AccordionStateOptions,
} from "./accordion.types";
import type { AccordionContentProps } from "./components/content";
import type { AccordionItemProps } from "./components/item";
import type { AccordionRootProps } from "./components/root";
import type { AccordionTriggerProps } from "./components/trigger";

export type AccordionCompound = {
  Root: (props: AccordionRootProps) => React.ReactNode;
  Item: (props: AccordionItemProps) => React.ReactNode;
  Trigger: typeof AccordionTrigger;
  Content: (props: AccordionContentProps) => React.ReactNode;
  useState: (options?: AccordionStateOptions) => AccordionState;
  useController: () => AccordionController;
};

export const Accordion: AccordionCompound = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
  useState: useAccordionState,
  useController: useAccordionController,
});

export namespace Accordion {
  export type Controller = AccordionController;
  export type State = AccordionState;
  export type StateOptions = AccordionStateOptions;
  export type RootProps = AccordionRootProps;
  export type ItemProps = AccordionItemProps;
  export type TriggerProps = AccordionTriggerProps;
  export type ContentProps = AccordionContentProps;
}
