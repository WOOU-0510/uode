# @uode/base-ui-react

React 19용 headless UI primitive 패키지입니다. 동작과 접근성 속성만 제공하고, 제품 스타일은 사용하는 위치에서 CSS Module로 작성합니다.

전체 API와 예제는 [컴포넌트 사용법](./docs/components.md)에서 확인합니다.

```tsx
import { Button, TreeView } from "@uode/base-ui-react";
import "@uode/base-ui-react/style.css";
```

## API

- `Button.Root`, `Button.Trigger`, `Button.useState`, `Button.useController`
- `Accordion.Root`, `Accordion.Item`, `Accordion.Trigger`, `Accordion.Content`, `Accordion.useState`
- `TreeView.Root`, `TreeView.Item`, `TreeView.Group`, `TreeView.useState`
- `Popover.Root`, `Popover.Host`, `Popover.Backdrop`, `Popover.useState`, `Popover.useController`
- `Icon` 개별 subpath와 opt-in registry
- `useTextBlockHeight`, `useTextBlockLines`

모든 ref는 React 19의 일반 `ref` prop으로 전달합니다.

## 상태 계약

상태 prop이 없으면 `default*` 값을 초기값으로 사용하는 uncontrolled 컴포넌트입니다. 상태 prop이 있으면 변경 콜백으로 다음 값을 전달하는 controlled 컴포넌트입니다.

각 상태형 컴포넌트의 `useState`는 `@uode/base-ui-core` store를
`React.useSyncExternalStore`로 구독하는 선택적 adapter입니다. 반환한 상태와
setter를 Root에 주입하거나 Root 밖의 UI에서 함께 사용할 수 있습니다.

```tsx
const [pressed, setPressed] = React.useState(false);

<Button.Root pressed={pressed} onPressedChange={setPressed}>
  <Button.Trigger toggle>토글</Button.Trigger>
</Button.Root>;
```

## 접근성

- TreeView는 단일 선택과 Arrow, Home, End, Enter, Space 키보드 탐색을 제공합니다.
- Accordion Trigger와 Content의 `aria-controls`, `aria-expanded`, `aria-labelledby`는 자동 연결됩니다.
- 아이콘은 `@uode/base-ui-react/icons/<name>` 개별 경로가 기본이며 문자열 registry는 `icons/registry`에서만 제공합니다.
- Icon은 기본적으로 장식용입니다. 의미가 있는 아이콘은 감싸는 컨트롤에 accessible name을 제공합니다.

## Popover의 범위

현재 Popover는 기준 요소에 배치되는 anchored popover가 아니라, `replace` 또는 `stack` 방식으로 화면 패널을 관리하는 패널 스택입니다.

## 검증

```bash
bun run --filter @uode/base-ui-core test
bun run --filter @uode/base-ui-core build
bun run --filter @uode/base-ui-react build
```

상호작용 예제는 `/playground/package/base-ui-react/*`에서 확인합니다.
