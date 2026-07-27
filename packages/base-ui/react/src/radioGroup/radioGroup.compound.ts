import { RadioGroupItem, RadioGroupLegend, RadioGroupRoot } from "./components";

export type RadioGroupCompound = typeof RadioGroupRoot & {
  readonly Root: typeof RadioGroupRoot;
  readonly Legend: typeof RadioGroupLegend;
  readonly Item: typeof RadioGroupItem;
};

export const RadioGroup: RadioGroupCompound = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Legend: RadioGroupLegend,
  Item: RadioGroupItem,
});
