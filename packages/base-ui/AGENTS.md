# Base UI React rules

- Target React 19 and its type definitions.
- Receive DOM refs as ordinary `ref` props; do not add `React.forwardRef`.
- Read Context with `React.use(Context)` and provide it with `<Context value={value}>`.
- Keep the compound component public API compatible unless the task explicitly changes it.
