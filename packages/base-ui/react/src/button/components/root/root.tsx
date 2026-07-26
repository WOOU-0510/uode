import * as React from "react";
import { ButtonContext } from "../../button.context";
import { useButtonState } from "../../button.hook";
import type { ButtonContextValue, ButtonController } from "../../button.types";

export type ButtonRootProps = {
  children: React.ReactNode;
  defaultDisabled?: boolean;
  defaultPressed?: boolean;
  disabled?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  pressed?: boolean;
};

type ButtonRootComponentProps = ButtonRootProps;

export const ButtonRoot = (props: ButtonRootComponentProps) => {
  const {
    children,
    defaultDisabled,
    defaultPressed,
    disabled: disabledProp,
    onPressedChange,
    pressed: pressedProp,
  } = props;

  const internalState = useButtonState({
    defaultDisabled,
    defaultPressed,
  });
  const disabled = disabledProp ?? internalState.disabled;
  const pressed = pressedProp ?? internalState.pressed;

  const setDisabled = React.useCallback(
    (nextDisabled: boolean) => {
      if (disabledProp === undefined) {
        internalState.setDisabled(nextDisabled);
      }
    },
    [disabledProp, internalState],
  );
  const setPressed = React.useCallback(
    (nextPressed: boolean) => {
      if (pressedProp === undefined) {
        internalState.setPressed(nextPressed);
      }
      onPressedChange?.(nextPressed);
    },
    [internalState, onPressedChange, pressedProp],
  );

  const controller = React.useMemo(
    (): ButtonController => ({
      disabled,
      pressed,
      setDisabled,
      setPressed,
      togglePressed: () => {
        if (!disabled) {
          setPressed(!pressed);
        }
      },
    }),
    [disabled, pressed, setDisabled, setPressed],
  );

  const value = React.useMemo(
    (): ButtonContextValue => ({
      controller,
    }),
    [controller],
  );

  return <ButtonContext value={value}>{children}</ButtonContext>;
};
