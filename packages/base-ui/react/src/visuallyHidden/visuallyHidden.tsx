import cx from "classnames/bind";
import type * as React from "react";
import styles from "./visuallyHidden.module.scss";

const cn = cx.bind(styles);

export type VisuallyHiddenProps = React.ComponentPropsWithRef<"span">;

export const VisuallyHidden = (props: VisuallyHiddenProps) => {
  const { className, ...rest } = props;
  return <span {...rest} className={cn("root", className)} />;
};
