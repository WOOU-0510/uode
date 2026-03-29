import * as React from "react";
import { ButtonContext } from "../../button.context";

export type ButtonTriggerProps = React.ComponentPropsWithoutRef<"button"> & {
  /** true이면 클릭 시 `togglePressed`를 호출하고 `aria-pressed`를 노출합니다. */
  toggle?: boolean;
};

type ButtonTriggerComponentProps = ButtonTriggerProps;

export const ButtonTrigger = React.forwardRef<
  HTMLButtonElement,
  ButtonTriggerComponentProps
>((props, forwardedRef) => {
  const {
    toggle = false,
    type = "button",
    disabled: disabledFromProps,
    className,
    onClick,
    "aria-pressed": ariaPressedProp,
    ...rest
  } = props;

  const context = React.useContext(ButtonContext);
  if (context === null) {
    throw new Error(
      "Button.Trigger는 Button.Root 내부에서만 사용할 수 있습니다.",
    );
  }

  const { controller } = context;
  const disabled =
    controller.disabled || disabledFromProps === true;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (toggle) {
      controller.togglePressed();
    }
  };

  let ariaPressed: boolean | undefined;
  if (ariaPressedProp !== undefined) {
    ariaPressed = ariaPressedProp;
  } else if (toggle) {
    ariaPressed = controller.pressed;
  }

  return (
    <button
      {...rest}
      ref={forwardedRef}
      type={type}
      className={className}
      disabled={disabled}
      aria-pressed={ariaPressed}
      onClick={handleClick}
    />
  );
});

ButtonTrigger.displayName = "ButtonTrigger";
