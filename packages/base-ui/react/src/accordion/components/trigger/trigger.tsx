import * as React from "react";
import { AccordionContext } from "../../accordion.context";
import { useAccordionItem } from "../../accordion.item.hook";

export type AccordionTriggerProps = Omit<
  React.ComponentPropsWithRef<"button">,
  "aria-controls" | "aria-expanded" | "disabled" | "type"
>;

type AccordionTriggerComponentProps = AccordionTriggerProps;

export const AccordionTrigger = (props: AccordionTriggerComponentProps) => {
  const { ref, onClick, ...rest } = props;
  const accordionContext = React.use(AccordionContext);
  const itemContext = useAccordionItem();
  if (accordionContext === null) {
    throw new Error(
      "Accordion.Trigger는 Accordion.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  const expanded = accordionContext.controller.isExpanded(itemContext.value);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    accordionContext.controller.toggle(itemContext.value);
  };

  return (
    <button
      {...rest}
      ref={ref}
      id={itemContext.triggerId}
      type="button"
      aria-controls={itemContext.contentId}
      aria-expanded={expanded}
      data-state={expanded ? "open" : "closed"}
      disabled={itemContext.disabled}
      onClick={handleClick}
    />
  );
};
