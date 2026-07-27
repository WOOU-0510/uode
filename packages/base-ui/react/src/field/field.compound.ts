import {
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
} from "./components";

export type FieldCompound = typeof FieldRoot & {
  readonly Root: typeof FieldRoot;
  readonly Label: typeof FieldLabel;
  readonly Control: typeof FieldControl;
  readonly Description: typeof FieldDescription;
  readonly Error: typeof FieldError;
};

export const Field: FieldCompound = Object.assign(FieldRoot, {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
});
