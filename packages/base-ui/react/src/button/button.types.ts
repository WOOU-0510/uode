export type ButtonController = {
  disabled: boolean;
  pressed: boolean;
  setDisabled: (disabled: boolean) => void;
  setPressed: (pressed: boolean) => void;
  togglePressed: () => void;
};

export type ButtonContextValue = {
  controller: ButtonController;
};
