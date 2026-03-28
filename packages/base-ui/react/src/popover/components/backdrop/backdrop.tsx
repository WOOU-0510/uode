import cx from "classnames/bind";
import * as React from "react";
import { PopoverContext } from "../../popover.context";
import styles from "./backdrop.module.scss";

const cn = cx.bind(styles);

export type PopoverBackdropProps = React.ComponentPropsWithoutRef<"div">;

type PopoverBackdropComponentProps = PopoverBackdropProps;

export const PopoverBackdrop = (props: PopoverBackdropComponentProps) => {
  const { className, ...rest } = props;
  const context = React.useContext(PopoverContext);
  if (context === null) {
    throw new Error(
      "Popover.Backdrop는 Popover.Root 내부에서만 사용할 수 있습니다."
    );
  }

  if (context.controller.topEntry === null) {
    return null;
  }

  const composedClassName = cn("backdrop", className);

  return <div {...rest} className={composedClassName} />;
};
