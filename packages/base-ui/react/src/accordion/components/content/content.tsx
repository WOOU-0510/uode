import cx from "classnames/bind";
import * as React from "react";
import { AccordionContext } from "../../accordion.context";
import { useAccordionItem } from "../../accordion.item.hook";
import styles from "./content.module.scss";

const cn = cx.bind(styles);

export type AccordionContentProps = Omit<
  React.ComponentPropsWithRef<"section">,
  "aria-labelledby" | "hidden" | "id"
>;

type AccordionContentComponentProps = AccordionContentProps;

export const AccordionContent = (props: AccordionContentComponentProps) => {
  const { children, className, ...rest } = props;
  const accordionContext = React.use(AccordionContext);
  const itemContext = useAccordionItem();
  if (accordionContext === null) {
    throw new Error(
      "Accordion.Content는 Accordion.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  const expanded = accordionContext.controller.isExpanded(itemContext.value);

  return (
    <section
      {...rest}
      className={cn("content", className)}
      id={itemContext.contentId}
      aria-labelledby={itemContext.triggerId}
      aria-hidden={!expanded}
      data-state={expanded ? "open" : "closed"}
      inert={!expanded}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  );
};
