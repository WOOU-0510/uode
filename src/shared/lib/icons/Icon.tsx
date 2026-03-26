import type { SVGProps } from "react";

import { ICON_REGISTRY, type IconName } from "./generated/registry";

export type { IconName };

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const Cmp = ICON_REGISTRY[name];
  return <Cmp {...props} />;
}
