import * as React from "react";
import { PopoverContext } from "../../popover.context";
export type PopoverHostProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children" | "popover"
> & {
  children: React.ReactNode;
};

type PopoverHostComponentProps = PopoverHostProps;

export const PopoverHost = (props: PopoverHostComponentProps) => {
  const { className, children, ...rest } = props;
  const context = React.useContext(PopoverContext);
  if (context === null) {
    throw new Error(
      "Popover.Host는 Popover.Root 내부에서만 사용할 수 있습니다."
    );
  }

  return (
    <div {...rest} ref={context.rootRef} className={className} popover="manual">
      {children}
    </div>
  );
};
