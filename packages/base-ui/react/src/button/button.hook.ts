import * as React from "react";
import { ButtonContext } from "./button.context";
import type { ButtonController } from "./button.types";

export const useButtonController = (): ButtonController => {
  const context = React.useContext(ButtonContext);
  if (context === null) {
    throw new Error(
      "useButtonController는 Button.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  return context.controller;
};
