import type * as React from "react";
import { ButtonRoot, ButtonTrigger } from "./components";
import { useButtonController, useButtonState } from "./button.hook";
import type {
  ButtonController,
  ButtonState,
  ButtonStateOptions,
} from "./button.types";
import type { ButtonTriggerProps } from "./components/trigger";
import type { ButtonRootProps } from "./components/root";

type ButtonCompound = {
  Root: (props: ButtonRootProps) => React.ReactNode;
  Trigger: typeof ButtonTrigger;
  useState: (options?: ButtonStateOptions) => ButtonState;
  useController: () => ButtonController;
};

export const Button: ButtonCompound = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  Trigger: ButtonTrigger,
  useState: useButtonState,
  useController: useButtonController,
});

export namespace Button {
  export type Controller = ButtonController;
  export type State = ButtonState;
  export type StateOptions = ButtonStateOptions;
  export type RootProps = ButtonRootProps;
  export type TriggerProps = ButtonTriggerProps;
}

export type { ButtonCompound };
