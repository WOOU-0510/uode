# Base UI React rules

- Target React 19 and its type definitions.
- Receive DOM refs as ordinary `ref` props; do not add `React.forwardRef`.
- Read Context with `React.use(Context)` and provide it with `<Context value={value}>`.
- Keep the compound component public API compatible unless the task explicitly changes it.
- Use camelCase for component folders and implementation filenames.
- Prefer atomic, core, reusable primitives. Preserve native HTML semantics and
  behavior instead of rebuilding them in JavaScript.
- Accept the relevant native element props and ref. Model only non-native state
  and behavior with explicit typed props.
- Keep value, checked, validation, sorting, filtering, and pagination state in
  consumers such as TanStack Form or TanStack Table. Base UI may integrate with
  those states but must not create a competing state engine.
- Optional external-store hooks are convenience APIs, not a requirement for
  using the visual component with injected state.
- Put framework-independent state and behavior in `core`; keep React
  subscription and rendering code in `react`. Extract shared core logic only
  after it is genuinely repeated.
- Use shadcn/ui primarily to inventory useful component categories. Do not copy
  its implementation architecture by default.
- Add or update the component's Markdown usage documentation whenever its
  public API or recommended integration changes.
