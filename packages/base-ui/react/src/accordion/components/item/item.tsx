import * as React from "react";
import { AccordionContext } from "../../accordion.context";
import { AccordionItemContext } from "../../accordion.item.context";
import type { AccordionItemContextValue } from "../../accordion.types";

export type AccordionItemProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
> & {
  readonly children: React.ReactNode;
  readonly value: string;
  readonly disabled?: boolean;
};

type AccordionItemComponentProps = AccordionItemProps;

export const AccordionItem = (props: AccordionItemComponentProps) => {
  const { children, value, disabled = false, ...rest } = props;
  const accordionContext = React.use(AccordionContext);
  if (accordionContext === null) {
    throw new Error(
      "Accordion.Item은 Accordion.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  const itemId = React.useId();
  const expanded = accordionContext.controller.isExpanded(value);
  const contextValue = React.useMemo(
    (): AccordionItemContextValue => ({
      value,
      disabled,
      triggerId: `${itemId}-trigger`,
      contentId: `${itemId}-content`,
    }),
    [disabled, itemId, value],
  );

  return (
    <AccordionItemContext value={contextValue}>
      <div
        {...rest}
        data-disabled={disabled ? "" : undefined}
        data-state={expanded ? "open" : "closed"}
      >
        {children}
      </div>
    </AccordionItemContext>
  );
};
