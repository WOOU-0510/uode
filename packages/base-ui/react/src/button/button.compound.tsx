import type * as React from "react";
import { ButtonRoot, ButtonTrigger } from "./components";
import { useButtonController } from "./button.hook";
import type { ButtonController } from "./button.types";
import type { ButtonTriggerProps } from "./components/trigger";
import type { ButtonRootProps } from "./components/root";

type ButtonCompound = {
  Root: (props: ButtonRootProps) => React.ReactNode;
  Trigger: typeof ButtonTrigger;
  useController: () => ButtonController;
};

export const Button: ButtonCompound = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  Trigger: ButtonTrigger,
  useController: useButtonController,
});

export namespace Button {
  export type Controller = ButtonController;
  export type RootProps = ButtonRootProps;
  export type TriggerProps = ButtonTriggerProps;
}

export type { ButtonCompound };
