# @uode/base-ui-react 컴포넌트 사용법

이 문서는 현재 공개된 컴포넌트와 hook의 사용법을 설명합니다.

## 목차

1. [공통 원칙](#공통-원칙)
2. [Button](#button)
3. [Accordion](#accordion)
4. [Popover](#popover)
5. [TreeView](#treeview)
6. [Icon](#icon)
7. [Pretext hooks](#pretext-hooks)
8. [TanStack Form과 연결](#tanstack-form과-연결)
9. [TanStack Table과 연결](#tanstack-table과-연결)
10. [Next.js에서 사용](#nextjs에서-사용)

## 공통 원칙

### import

```tsx
import {
  Accordion,
  Button,
  Icon,
  Popover,
  TreeView,
  useTextBlockHeight,
  useTextBlockLines,
} from "@uode/base-ui-react";
import "@uode/base-ui-react/style.css";
```

상호작용 컴포넌트를 사용하는 파일은 Client Component여야 합니다.

```tsx
"use client";
```

### HTML props와 ref

실제 DOM을 렌더링하는 하위 컴포넌트는 해당 HTML 요소의 props를 받습니다.
따라서 `className`, `style`, `id`, `data-*`, `aria-*`, 이벤트 핸들러와 ref를
직접 전달할 수 있습니다.

```tsx
const buttonRef = React.useRef<HTMLButtonElement>(null);

<Button.Root>
  <Button.Trigger
    ref={buttonRef}
    className={styles.button}
    data-importance="primary"
    onClick={(event) => {
      if (!canRun) event.preventDefault();
    }}
  >
    실행
  </Button.Trigger>
</Button.Root>;
```

사용자 이벤트 핸들러가 먼저 실행됩니다. `event.preventDefault()`를 호출하면
컴포넌트의 후속 상태 변경을 취소할 수 있습니다.

### controlled와 uncontrolled

- `default*`: 첫 렌더의 초기값만 지정합니다.
- 상태 prop: 현재 값을 외부에서 제어합니다.
- `on*Change`: 다음 상태를 전달받습니다.

한 상태에 대해 `default*`와 controlled prop을 동시에 사용하지 않습니다.

### 외부 상태 생성 hook

Button, Accordion, Popover, TreeView는 각각 namespaced `useState`를 제공합니다.
이 hook은 core store를 생성하고 `React.useSyncExternalStore`로 구독합니다.

```tsx
const state = TreeView.useState({
  defaultExpandedValues: ["notes"],
  defaultSelectedValue: "welcome",
});

<TreeView.Root
  expandedValues={state.expandedValues}
  focusedValue={state.focusedValue}
  selectedValue={state.selectedValue}
  onExpandedValuesChange={state.setExpandedValues}
  onFocusedValueChange={state.setFocusedValue}
  onSelectedValueChange={state.setSelectedValue}
>
  {/* UI */}
</TreeView.Root>;
```

외부 hook은 선택 사항입니다. Root의 uncontrolled 상태, 일반
`React.useState`, TanStack 상태나 다른 store도 같은 controlled props에 연결할
수 있습니다. `default*` options는 hook이 처음 store를 만들 때만 사용됩니다.

## Button

native `<button>`과 선택적인 `aria-pressed` 상태를 제공합니다.

### 구조

```tsx
<Button.Root>
  <Button.Trigger>버튼</Button.Trigger>
</Button.Root>
```

### `Button.Root`

DOM을 렌더링하지 않고 상태와 controller만 제공합니다.

| prop | type | 설명 |
|---|---|---|
| `children` | `React.ReactNode` | 하위 구성 |
| `defaultDisabled` | `boolean` | uncontrolled disabled 초기값 |
| `disabled` | `boolean` | Root가 제어하는 disabled |
| `defaultPressed` | `boolean` | uncontrolled pressed 초기값 |
| `pressed` | `boolean` | controlled pressed |
| `onPressedChange` | `(pressed: boolean) => void` | pressed 변경 통지 |

### `Button.Trigger`

`React.ComponentPropsWithRef<"button">`의 모든 props를 받습니다.

| 추가 prop | type | 기본값 | 설명 |
|---|---|---|---|
| `toggle` | `boolean` | `false` | 클릭 시 pressed를 전환하고 `aria-pressed` 노출 |

`type`의 기본값은 폼 제출을 방지하는 `"button"`입니다. 제출 버튼으로 쓸 때는
명시적으로 `type="submit"`을 전달합니다.

```tsx
<Button.Root>
  <Button.Trigger type="submit">저장</Button.Trigger>
</Button.Root>
```

### controlled 토글

```tsx
const [pressed, setPressed] = React.useState(false);

<Button.Root pressed={pressed} onPressedChange={setPressed}>
  <Button.Trigger toggle>
    {pressed ? "즐겨찾기 해제" : "즐겨찾기"}
  </Button.Trigger>
</Button.Root>;
```

### 외부 상태 hook

```tsx
const state = Button.useState({ defaultPressed: true });

<Button.Root
  disabled={state.disabled}
  pressed={state.pressed}
  onPressedChange={state.setPressed}
>
  <Button.Trigger toggle>즐겨찾기</Button.Trigger>
</Button.Root>;
```

hook은 `disabled`, `pressed`, `setDisabled`, `setPressed`,
`togglePressed`를 반환합니다.

### controller

`Button.useController()`는 Root 하위에서 사용할 수 있습니다.

```tsx
const status = Button.useController();

return <output>{status.pressed ? "선택됨" : "선택 안 됨"}</output>;
```

controller는 `disabled`, `pressed`, `setDisabled`, `setPressed`,
`togglePressed`를 제공합니다.

## Accordion

하나 또는 여러 section의 확장 상태와 Trigger/Content ARIA 연결을 제공합니다.

### 구조

```tsx
<Accordion.Root>
  <Accordion.Item value="account">
    <h2>
      <Accordion.Trigger>계정</Accordion.Trigger>
    </h2>
    <Accordion.Content>계정 설정</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### `Accordion.Root`

`<div>`를 렌더링하며 div의 HTML props와 ref를 받습니다.

| prop | type | 기본값 | 설명 |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | `"single"` | 동시에 펼칠 수 있는 항목 수 |
| `defaultExpandedValues` | `readonly string[]` | `[]` | uncontrolled 초기 확장 값 |
| `expandedValues` | `readonly string[]` | - | controlled 확장 값 |
| `onExpandedValuesChange` | `(values: readonly string[]) => void` | - | 다음 확장 값 |

### `Accordion.Item`

`<div>`를 렌더링하며 div의 HTML props와 ref를 받습니다.

| 추가 prop | type | 설명 |
|---|---|---|
| `value` | `string` | Root 안에서 고유한 값 |
| `disabled` | `boolean` | Trigger 비활성화 |

상태 확인용 `data-state="open|closed"`와 `data-disabled`가 제공됩니다.

### `Accordion.Trigger`

native `<button>`을 렌더링합니다. `aria-expanded`, `aria-controls`, `id`,
`disabled`, `type`은 Item과 Content 연결을 위해 컴포넌트가 관리합니다.
나머지 button props와 ref는 전달할 수 있습니다.

### `Accordion.Content`

`<section>`을 렌더링합니다. 닫힌 상태에서는 `aria-hidden`과 `inert`가
설정됩니다. section props와 ref를 전달할 수 있지만 연결에 사용되는 `id`,
`aria-labelledby`, `hidden`은 컴포넌트가 관리합니다.

### controlled 예제

```tsx
const [expandedValues, setExpandedValues] =
  React.useState<readonly string[]>(["account"]);

<Accordion.Root
  type="multiple"
  expandedValues={expandedValues}
  onExpandedValuesChange={setExpandedValues}
>
  {/* Item 조합 */}
</Accordion.Root>;
```

### 외부 상태 hook

```tsx
const state = Accordion.useState({
  type: "multiple",
  defaultExpandedValues: ["account"],
});

<Accordion.Root
  type="multiple"
  expandedValues={state.expandedValues}
  onExpandedValuesChange={state.setExpandedValues}
>
  {/* Item 조합 */}
</Accordion.Root>;
```

hook은 `setExpandedValues`, `expand`, `collapse`, `toggle`, `isExpanded`도
제공하므로 Root 밖의 toolbar에서 상태를 제어할 수 있습니다.

## Popover

현재 Popover는 trigger에 붙는 일반 tooltip형 popover가 아닙니다. native
Popover API를 사용해 replace/stack 방식의 화면 패널을 관리합니다.

### 구조

```tsx
<Popover.Root>
  <OpenSettingsButton />
  <Popover.Backdrop />
  <Popover.Host>
    <CurrentPanel />
  </Popover.Host>
</Popover.Root>
```

`Popover.Root`는 DOM을 렌더링하지 않습니다. `Popover.Host`가
`<div popover="manual">`을 렌더링하고, `Popover.Backdrop`은 열린 패널이 있을
때만 `<div>`를 렌더링합니다. 두 DOM 컴포넌트 모두 div props와 ref를 받습니다.

`Popover.Root`는 `defaultEntries`, `entries`, `onEntriesChange`를 받습니다.
외부 주입이 없으면 내부 core store를 사용합니다.

### panel 열기

```tsx
const OpenSettingsButton = () => {
  const controller = Popover.useController();

  return (
    <button
      type="button"
      onClick={() => controller.openPanel("settings", { section: "editor" })}
    >
      설정
    </button>
  );
};
```

`openPanel`의 세 번째 인자로 `{ mode: "stack" }`을 전달하면 기존 패널 위에
쌓습니다. 기본 `"replace"`는 현재 stack을 새 패널 하나로 교체합니다.

### panel 렌더링

```tsx
const CurrentPanel = () => {
  const controller = Popover.useController();

  if (controller.topEntry?.key === "settings") {
    return <SettingsPanel params={controller.topEntry.params} />;
  }
  return null;
};
```

`params` 타입은 `unknown`입니다. 패널 key를 확인한 소비처가 타입을 좁혀야
합니다.

### 닫기

```tsx
const CloseLayer = () => {
  const controller = Popover.useController();

  return (
    <Popover.Backdrop onClick={() => controller.closeTopPanel()} />
  );
};
```

- `closeTopPanel()`: 가장 위 패널만 닫기
- `closeAllPanels()`: 전체 stack 닫기

### 외부 상태 hook

```tsx
const state = Popover.useState({ idPrefix: "settings" });

<button
  type="button"
  onClick={() => state.openPanel("settings", { tab: "editor" })}
>
  설정
</button>

<Popover.Root
  entries={state.entries}
  onEntriesChange={state.setEntries}
>
  <Popover.Host>{/* 현재 panel */}</Popover.Host>
</Popover.Root>;
```

hook의 `openPanel`, `closeTopPanel`, `closeAllPanels`는 Root 밖에서도 사용할 수
있습니다.

### 위치 스타일

Popover는 `center`, `top-right` 같은 위치 mode를 제공하지 않습니다.
`Popover.Host`가 div props를 받으므로 소비처에서 className이나 `data-*`를
전달해 배치합니다.

```tsx
<Popover.Host className={styles.centerPopover}>
  {/* panel */}
</Popover.Host>
```

```scss
.centerPopover {
  position: fixed;
  inset: 50% auto auto 50%;
  margin: 0;
  transform: translate(-50%, -50%);
}
```

### 애니메이션 시트

`Popover.Host`는 위치를 제한하지 않으므로 상·하·좌·우 시트로 사용할 수
있습니다. 공통 효과는 `@uode/styles/animation`의 `slide-in`, `slide-out`,
`fade-in`, `fade-out` mixin을 사용합니다.

```scss
@use "pkg:@uode/styles/animation" as animation;

.rightSheet {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(26rem, calc(100vw - 2rem));
}

.rightSheet[data-state="open"] {
  @include animation.slide-in(
    $x: 100%,
    $y: 0,
    $duration: 320ms,
    $timing-function: cubic-bezier(0.22, 1, 0.36, 1)
  );
}

.rightSheet[data-state="closed"] {
  @include animation.slide-out(
    $x: 100%,
    $y: 0,
    $duration: 220ms,
    $timing-function: ease-in
  );
}
```

`closeTopPanel()`을 호출하면 native popover가 바로 닫힙니다. 퇴장 효과가
필요한 소비처는 먼저 `data-state="closed"`로 바꾸고 Host의
`animationend`에서 `closeTopPanel()`을 호출해 DOM을 유지합니다. 전체 동작
예시는 Playground의 `Animated sheets`에서 확인할 수 있습니다.

## TreeView

단일 선택 tree, 확장 상태, roving tab index와 기본 tree keyboard 탐색을
제공합니다.

### 구조

```tsx
<TreeView.Root aria-label="노트">
  <TreeView.Item value="notes" hasChildren>
    노트
    <TreeView.Group>
      <TreeView.Item value="welcome">welcome.md</TreeView.Item>
    </TreeView.Group>
  </TreeView.Item>
</TreeView.Root>
```

### `TreeView.Root`

`<div role="tree">`를 렌더링하며 div props와 ref를 받습니다.

| prop | type | 설명 |
|---|---|---|
| `defaultExpandedValues` | `readonly string[]` | uncontrolled 초기 확장 값 |
| `expandedValues` | `readonly string[]` | controlled 확장 값 |
| `onExpandedValuesChange` | `(values: readonly string[]) => void` | 다음 확장 값 |
| `defaultFocusedValue` | `string \| null` | uncontrolled 초기 focus 값 |
| `focusedValue` | `string \| null` | controlled roving focus 값 |
| `onFocusedValueChange` | `(value: string \| null) => void` | 다음 focus 값 |
| `defaultSelectedValue` | `string \| null` | uncontrolled 초기 선택 값 |
| `selectedValue` | `string \| null` | controlled 선택 값 |
| `onSelectedValueChange` | `(value: string \| null) => void` | 다음 선택 값 |

접근 가능한 이름을 위해 `aria-label` 또는 `aria-labelledby`를 전달합니다.

### `TreeView.Item`

`<div role="treeitem">`을 렌더링하며 div props와 ref를 받습니다.

| 추가 prop | type | 기본값 | 설명 |
|---|---|---|---|
| `value` | `string` | 필수 | Root 안에서 고유한 값 |
| `hasChildren` | `boolean` | `false` | 확장 가능한 하위 Group 존재 |
| `disabled` | `boolean` | `false` | 선택과 focus 이동에서 제외 |

`aria-expanded`, `aria-selected`, `aria-disabled`, `data-state`,
`data-disabled`는 현재 상태에서 계산됩니다.

### `TreeView.Group`

`<div role="group">`을 렌더링하며 반드시 `TreeView.Item` 바로 아래에서
사용합니다. 부모 Item이 닫히면 `hidden`이 적용됩니다.

### controlled 예제

```tsx
const [expandedValues, setExpandedValues] =
  React.useState<readonly string[]>(["notes"]);
const [selectedValue, setSelectedValue] =
  React.useState<string | null>(null);

<TreeView.Root
  aria-label="파일"
  expandedValues={expandedValues}
  selectedValue={selectedValue}
  onExpandedValuesChange={setExpandedValues}
  onSelectedValueChange={setSelectedValue}
>
  {/* Item과 Group */}
</TreeView.Root>;
```

### 외부 상태 hook

```tsx
const state = TreeView.useState({
  defaultExpandedValues: ["notes"],
  defaultFocusedValue: "welcome",
  defaultSelectedValue: "welcome",
});

<TreeView.Root
  expandedValues={state.expandedValues}
  focusedValue={state.focusedValue}
  selectedValue={state.selectedValue}
  onExpandedValuesChange={state.setExpandedValues}
  onFocusedValueChange={state.setFocusedValue}
  onSelectedValueChange={state.setSelectedValue}
>
  {/* Item과 Group */}
</TreeView.Root>;
```

hook이 반환한 setter는 TreeView 밖의 breadcrumb, toolbar, inspector에서도
사용할 수 있습니다.

### 부모 Item 클릭으로 확장

기본 Item 클릭은 선택을 담당합니다. 폴더, 문서 목차, 조직도처럼 부모 행
클릭으로 확장하려면 외부 상태 hook의 `setExpanded`를 Item의 `onClick`에서
조합합니다. Accordion을 중첩할 필요가 없습니다.

```tsx
<TreeView.Item
  value="guide"
  hasChildren
  onClick={(event) => {
    if (
      !(event.target instanceof Element) ||
      event.target.closest('[role="treeitem"]') !==
        event.currentTarget
    ) {
      return;
    }
    state.setExpanded(
      "guide",
      !state.expandedValues.includes("guide"),
    );
  }}
>
  시작 가이드
  <TreeView.Group>{/* 하위 절 */}</TreeView.Group>
</TreeView.Item>
```

### keyboard

| key | 동작 |
|---|---|
| `ArrowDown`, `ArrowUp` | 보이는 다음/이전 Item으로 이동 |
| `Home`, `End` | 첫/마지막 보이는 Item으로 이동 |
| `ArrowRight` | 닫힌 Item 확장, 열린 Item의 첫 child로 이동 |
| `ArrowLeft` | 열린 Item 축소, 아니면 parent Item으로 이동 |
| `Enter`, `Space` | 현재 Item 선택 |

### controller

`TreeView.useController()`는 Root 하위에서 현재 확장, focus, 선택 값과
`select`, `setExpanded`, `setFocusedValue` action을 제공합니다.

## Icon

생성된 SVG registry에서 아이콘을 선택해 렌더링합니다.

```tsx
<Icon name="react" width={20} height={20} aria-hidden />
```

`IconProps`는 `React.SVGProps<SVGSVGElement>`와 `name`으로 구성되므로 SVG의
기본 props를 전달할 수 있습니다.

아이콘만 있는 버튼에는 버튼 자체에 accessible name을 제공합니다.

```tsx
<button type="button" aria-label="새로고침">
  <Icon name="arrow_range" aria-hidden />
</button>
```

## Pretext hooks

canvas 기반 텍스트 layout을 클라이언트에서 측정합니다.

### `useTextBlockHeight`

```tsx
const result = useTextBlockHeight({
  text,
  font: "400 16px sans-serif",
  maxWidth: 320,
  lineHeight: 24,
});

return <output>{result.height}px / {result.lineCount}줄</output>;
```

`height`와 `lineCount`를 반환합니다.

### `useTextBlockLines`

같은 입력을 받고 `height`, `lineCount`와 줄 단위 `lines`를 반환합니다.

```tsx
const result = useTextBlockLines(input);

return (
  <ol>
    {result.lines.map((line, index) => (
      <li key={index}>{line.text}</li>
    ))}
  </ol>
);
```

SSR에서는 0 높이와 빈 줄 목록으로 시작한 뒤 client layout effect에서
측정합니다. `prepareOptions` 객체는 필요하면 `React.useMemo`로 안정화합니다.

## TanStack Form과 연결

base-ui가 TanStack Form의 값, touched, validation 상태를 소유하지 않습니다.
field가 제공한 값을 HTML props와 controlled props에 연결합니다.

```tsx
<form.Field
  name="notifications"
  children={(field) => (
    <Button.Root
      pressed={field.state.value}
      onPressedChange={field.handleChange}
    >
      <Button.Trigger
        toggle
        name={field.name}
        onBlur={field.handleBlur}
        aria-invalid={!field.state.meta.isValid}
      >
        알림
      </Button.Trigger>
    </Button.Root>
  )}
/>
```

텍스트, checkbox, radio, select는 우선 native 요소에 `name`, `value`,
`checked`, `onBlur`, `onChange`, `aria-invalid`를 직접 전달합니다.

## TanStack Table과 연결

base-ui는 sorting, filtering, pagination, selection state를 구현하지 않습니다.
TanStack Table의 row model을 native table markup에 직접 렌더링합니다.

```tsx
<table>
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {/* flexRender로 header cell 렌더링 */}
      </tr>
    ))}
  </thead>
  <tbody>{/* table.getRowModel() 렌더링 */}</tbody>
</table>
```

필요한 상호작용에는 Button, Menu, Tooltip 같은 작은 primitive를 조합합니다.
TanStack의 `Table<TData>` 인스턴스를 base-ui props로 고정하지 않습니다.

## Next.js에서 사용

Server Component는 데이터 조회와 직렬화 가능한 초기값을 담당하고,
상호작용은 Client Component로 분리합니다.

```tsx
// page.tsx
import { FileTree } from "./FileTree";

export default async function Page() {
  const files = await loadFiles();
  return <FileTree files={files} />;
}
```

```tsx
// FileTree.tsx
"use client";

import { TreeView } from "@uode/base-ui-react";

export const FileTree = (props: FileTreeProps) => {
  return <TreeView.Root>{/* 직렬화된 files 렌더링 */}</TreeView.Root>;
};
```

서버에서 DOM을 읽거나 module scope에서 browser API를 호출하지 않습니다.
