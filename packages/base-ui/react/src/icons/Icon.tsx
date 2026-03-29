import type * as React from "react";

import { ICON_REGISTRY, type IconName } from "./generated/registry";

export type { IconName };

export type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
};

export const Icon = (props: IconProps) => {
  const { name, ...svgProps } = props;
  const Cmp = ICON_REGISTRY[name];
  return <Cmp {...svgProps} />;
};
