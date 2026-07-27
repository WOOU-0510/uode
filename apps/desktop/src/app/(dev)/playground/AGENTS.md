# Playground rules

- Treat Playground pages as executable documentation.
- For a finite component catalog, create one explicit static route folder per
  component. Do not combine unrelated components behind a dynamic catch-all
  route.
- Co-locate each route's `page.tsx`, example-only components, state, and CSS
  Module in that route folder.
- Share only genuinely repeated presentation such as an example page or
  section frame. Do not create one renderer that switches between unrelated
  component examples.
- Every component page should include an unstyled/native example and multiple
  styled or behavior-focused examples when the component supports them.
- Form examples should demonstrate TanStack Form integration when validation or
  coordinated form state is relevant. Reuse schemas from
  `packages/validation/src/schemas`; add only broadly reusable schemas there.
- For UI QA, prefer the actual running Tauri WebView through Orca computer-use
  when available. Use Playwright browser automation for deterministic DOM,
  accessibility, or browser-specific checks.
- Close browser tabs and browser processes opened by the agent after QA. Do not
  close a Tauri app, dev server, or browser session that was already owned by
  the user.
