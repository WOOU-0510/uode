import type * as React from "react";

export type SkeletonProps = React.ComponentPropsWithRef<"div">;

export const Skeleton = (props: SkeletonProps) => {
  const { "aria-hidden": ariaHidden = true, ...rest } = props;
  return <div {...rest} aria-hidden={ariaHidden} data-skeleton="" />;
};
