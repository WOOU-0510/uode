import {
  NativeSelectOptGroup,
  NativeSelectOption,
  NativeSelectRoot,
} from "./components";

export type NativeSelectCompound = typeof NativeSelectRoot & {
  readonly Root: typeof NativeSelectRoot;
  readonly Option: typeof NativeSelectOption;
  readonly OptGroup: typeof NativeSelectOptGroup;
};

export const NativeSelect: NativeSelectCompound = Object.assign(
  NativeSelectRoot,
  {
    Root: NativeSelectRoot,
    Option: NativeSelectOption,
    OptGroup: NativeSelectOptGroup,
  },
);
