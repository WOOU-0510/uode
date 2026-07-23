export type AccordionController = {
  readonly expandedValues: readonly string[];
  readonly expand: (value: string) => void;
  readonly collapse: (value: string) => void;
  readonly toggle: (value: string) => void;
  readonly isExpanded: (value: string) => boolean;
};

export type AccordionContextValue = {
  readonly controller: AccordionController;
};

export type AccordionItemContextValue = {
  readonly value: string;
  readonly disabled: boolean;
  readonly triggerId: string;
  readonly contentId: string;
};
