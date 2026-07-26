import * as React from "react";
import {
  createButtonStore,
  type ButtonSnapshot,
  type ButtonStore,
} from "@uode/base-ui-core";
import { useStoreSnapshot } from "../utils/useStoreSnapshot";
import { ButtonContext } from "./button.context";
import type {
  ButtonController,
  ButtonState,
  ButtonStateOptions,
} from "./button.types";

export const useButtonState = (
  options: ButtonStateOptions = {},
): ButtonState => {
  const { snapshot, store } = useStoreSnapshot<ButtonSnapshot, ButtonStore>(
    () =>
      createButtonStore({
        initialDisabled: options.defaultDisabled,
        initialPressed: options.defaultPressed,
      }),
  );

  return React.useMemo(
    () => ({
      disabled: snapshot.disabled,
      pressed: snapshot.pressed,
      setDisabled: store.setDisabled,
      setPressed: store.setPressed,
      togglePressed: store.togglePressed,
    }),
    [snapshot.disabled, snapshot.pressed, store],
  );
};

export const useButtonController = (): ButtonController => {
  const context = React.use(ButtonContext);
  if (context === null) {
    throw new Error(
      "useButtonController는 Button.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  return context.controller;
};
