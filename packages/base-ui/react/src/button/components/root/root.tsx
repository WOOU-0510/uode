import * as React from "react";
import {
  createButtonStore,
  type ButtonSnapshot,
  type ButtonStore,
} from "@uode/base-ui-core";
import { ButtonContext } from "../../button.context";
import type { ButtonContextValue, ButtonController } from "../../button.types";

/** `getServerSnapshot`은 매번 동일한 참조를 돌려줘야 합니다. */
const serverButtonSnapshot: ButtonSnapshot = {
  disabled: false,
  pressed: false,
};

const getServerButtonSnapshot = (): ButtonSnapshot => serverButtonSnapshot;

export type ButtonRootProps = {
  children: React.ReactNode;
  defaultDisabled?: boolean;
  defaultPressed?: boolean;
  disabled?: boolean;
  pressed?: boolean;
};

type ButtonRootComponentProps = ButtonRootProps;

export const ButtonRoot = (props: ButtonRootComponentProps) => {
  const {
    children,
    defaultDisabled,
    defaultPressed,
    disabled: disabledProp,
    pressed: pressedProp,
  } = props;

  const storeRef = React.useRef<ButtonStore | null>(null);
  if (storeRef.current === null) {
    const initialDisabled =
      disabledProp !== undefined
        ? disabledProp
        : (defaultDisabled ?? false);
    const initialPressed =
      pressedProp !== undefined ? pressedProp : (defaultPressed ?? false);
    storeRef.current = createButtonStore({
      initialDisabled,
      initialPressed,
    });
  }
  const store = storeRef.current;

  React.useEffect(() => {
    if (disabledProp !== undefined) {
      store.setDisabled(disabledProp);
    }
  }, [disabledProp, store]);

  React.useEffect(() => {
    if (pressedProp !== undefined) {
      store.setPressed(pressedProp);
    }
  }, [pressedProp, store]);

  const snapshot = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerButtonSnapshot,
  );

  const controller = React.useMemo(
    (): ButtonController => ({
      disabled: snapshot.disabled,
      pressed: snapshot.pressed,
      setDisabled: store.setDisabled,
      setPressed: store.setPressed,
      togglePressed: store.togglePressed,
    }),
    [snapshot.disabled, snapshot.pressed, store],
  );

  const value = React.useMemo(
    (): ButtonContextValue => ({
      controller,
    }),
    [controller],
  );

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  );
};
