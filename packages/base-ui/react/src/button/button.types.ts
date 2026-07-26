export type ButtonController = {
  disabled: boolean;
  pressed: boolean;
  setDisabled: (disabled: boolean) => void;
  setPressed: (pressed: boolean) => void;
  togglePressed: () => void;
};

export type ButtonStateOptions = {
  readonly defaultDisabled?: boolean;
  readonly defaultPressed?: boolean;
};

export type ButtonState = ButtonController;

export type ButtonContextValue = {
  controller: ButtonController;
};
