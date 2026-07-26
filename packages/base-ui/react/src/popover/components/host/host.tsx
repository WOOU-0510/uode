import * as React from "react";
import { assignRef } from "../../../utils/assignRef";
import { PopoverContext } from "../../popover.context";
export type PopoverHostProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children" | "popover"
> & {
  children: React.ReactNode;
};

type PopoverHostComponentProps = PopoverHostProps;

export const PopoverHost = (props: PopoverHostComponentProps) => {
  const { className, children, ref, ...rest } = props;
  const context = React.use(PopoverContext);
  if (context === null) {
    throw new Error(
      "Popover.Host는 Popover.Root 내부에서만 사용할 수 있습니다.",
    );
  }

  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      context.rootRef.current = node;
      assignRef(ref, node);
    },
    [context.rootRef, ref],
  );

  return (
    <div {...rest} ref={setRef} className={className} popover="manual">
      {children}
    </div>
  );
};
