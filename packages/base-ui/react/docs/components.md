# @uode/base-ui-react 컴포넌트 사용법

이 문서는 현재 공개된 컴포넌트와 hook의 사용법을 설명합니다.

## 목차

1. [공통 원칙](#공통-원칙)
2. [폼 primitive](#폼-primitive)
3. [Field](#field)
4. [선택형 control](#선택형-control)
5. [Skeleton과 VisuallyHidden](#skeleton과-visuallyhidden)
6. [Button](#button)
7. [Accordion](#accordion)
8. [Popover](#popover)
9. [TreeView](#treeview)
10. [Icon](#icon)
11. [Pretext hooks](#pretext-hooks)
12. [TanStack Form과 연결](#tanstack-form과-연결)
13. [TanStack Table과 연결](#tanstack-table과-연결)
14. [Next.js에서 사용](#nextjs에서-사용)

## 공통 원칙

### import

```tsx
import {
  Accordion,
  Button,
  Checkbox,
  Field,
  Icon,
  Input,
  Label,
  NativeSelect,
  Popover,
  RadioGroup,
  Skeleton,
  Switch,
  Textarea,
  TreeView,
  VisuallyHidden,
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

## 폼 primitive

### Label, Input, Textarea

각 컴포넌트는 실제 `<label>`, `<input>`, `<textarea>`를 렌더링합니다. 별도
value나 validation 상태를 만들지 않으며 해당 native 요소의 props와 React 19
ref를 그대로 받습니다.

```tsx
const inputRef = React.useRef<HTMLInputElement>(null);

<Label htmlFor="title">제목</Label>
<Input
  ref={inputRef}
  id="title"
  name="title"
  required
  onChange={(event) => setTitle(event.currentTarget.value)}
/>

<Label>
  설명
  <Textarea name="description" rows={4} />
</Label>;
```

`type`, `value`, `defaultValue`, `checked`, `required`, `disabled`,
`onChange`, `onBlur`, `aria-*`, `data-*`의 의미는 native HTML과 같습니다.

### NativeSelect

`NativeSelect.Root`, `NativeSelect.Option`, `NativeSelect.OptGroup`은 각각 실제
`<select>`, `<option>`, `<optgroup>`을 렌더링합니다.

```tsx
<NativeSelect.Root name="team" defaultValue="frontend">
  <NativeSelect.OptGroup label="Engineering">
    <NativeSelect.Option value="frontend">Frontend</NativeSelect.Option>
    <NativeSelect.Option value="backend">Backend</NativeSelect.Option>
  </NativeSelect.OptGroup>
</NativeSelect.Root>
```

검색 가능한 custom select나 option 내부의 복합 UI는 이 컴포넌트의 책임이
아닙니다. native select로 부족한 요구가 확인될 때 별도 Custom Select 또는
Combobox를 사용합니다.

## Field

Field는 control의 값이나 validation을 소유하지 않고 label, description,
error의 id와 ARIA 관계만 연결합니다.

```tsx
<Field.Root invalid={invalid} required>
  <Field.Label>이메일</Field.Label>
  <Field.Control>
    {(controlProps) => (
      <Input
        {...controlProps}
        name="email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
    )}
  </Field.Control>
  <Field.Description>로그인에 사용할 주소입니다.</Field.Description>
  {invalid ? <Field.Error>이메일을 확인해 주세요.</Field.Error> : null}
</Field.Root>
```

### `Field.Root`

`<div>`를 렌더링하며 div props와 ref를 받습니다.

| prop | type | 기본값 | 설명 |
|---|---|---|---|
| `controlId` | `string` | `React.useId()` 기반 | Label과 control을 연결할 id |
| `invalid` | `boolean` | `false` | control의 `aria-invalid`와 error 연결 여부 |
| `disabled` | `boolean` | `false` | Control render props에 전달 |
| `required` | `boolean` | `false` | Control render props에 전달 |

상태 표현용 `data-invalid`, `data-disabled`, `data-required`가 Root에 제공됩니다.

### `Field.Control`

DOM을 렌더링하지 않는 render prop 컴포넌트입니다. 다음 값을 native control에
전달합니다.

| 값 | 설명 |
|---|---|
| `id` | Label의 `htmlFor`와 연결 |
| `aria-describedby` | Description 및 invalid일 때 Error id |
| `aria-invalid` | Root의 invalid 상태 |
| `disabled`, `required` | Root에서 명시한 native 상태 |

render prop이므로 Input뿐 아니라 Textarea, NativeSelect 또는 다른 native
control에도 같은 관계를 적용할 수 있습니다.

### `Field.Label`, `Field.Description`, `Field.Error`

- Label은 `<label>`을 렌더링하고 기본 `htmlFor`를 생성된 control id로 설정합니다.
- Description은 `<p>`를 렌더링하고 설명 id를 적용합니다.
- Error는 `<p>`를 렌더링하며 invalid 상태에서는 기본 `role="alert"`를 갖습니다.

## 선택형 control

### Checkbox

실제 `<input type="checkbox">`를 렌더링하며 `type`을 제외한 input props를
받습니다.

```tsx
<Label>
  <Checkbox name="terms" required />
  약관에 동의
</Label>
```

DOM property인 indeterminate도 선언적으로 설정할 수 있습니다.

```tsx
<Checkbox checked={false} indeterminate aria-label="일부 항목 선택됨" />
```

indeterminate일 때 `aria-checked="mixed"`가 자동 적용됩니다.

### Switch

실제 `<input type="checkbox" role="switch">`를 렌더링합니다. checked 상태는
native props 또는 외부 폼 상태가 소유합니다.

```tsx
<Label>
  <Switch
    name="notifications"
    checked={enabled}
    onChange={(event) => setEnabled(event.currentTarget.checked)}
  />
  알림 받기
</Label>
```

### RadioGroup

`RadioGroup.Root`, `RadioGroup.Legend`, `RadioGroup.Item`은 각각
`<fieldset>`, `<legend>`, `<input type="radio">`를 기반으로 합니다.

```tsx
<RadioGroup.Root name="contact" required>
  <RadioGroup.Legend>연락 방법</RadioGroup.Legend>
  <Label>
    <RadioGroup.Item value="email" defaultChecked />
    이메일
  </Label>
  <Label>
    <RadioGroup.Item value="chat" />
    채팅
  </Label>
</RadioGroup.Root>
```

Root의 `name`, `disabled`, `required`는 모든 Item에 전달됩니다. 선택 값은
브라우저의 동일 name radio 동작이나 소비처의 `checked`, `onChange`가 관리하며
별도 store를 만들지 않습니다.

## Skeleton과 VisuallyHidden

### Skeleton

`Skeleton`은 `data-skeleton`이 있는 `<div aria-hidden="true">`를 렌더링합니다.
크기, 형태, 색상과 animation은 className으로 주입합니다. 실제 로딩 영역에는
별도로 `aria-busy`와 accessible name 또는 상태 텍스트를 제공합니다.

```tsx
<section aria-busy="true" aria-label="프로필을 불러오는 중">
  <Skeleton className={styles.avatar} />
  <Skeleton className={styles.line} />
</section>
```

`@uode/styles/skeleton`은 호출부에서 조절 가능한 `pulse`와 `shimmer` mixin을
제공합니다.

```scss
@use "pkg:@uode/styles/skeleton" as skeleton;

.line {
  width: 12rem;
  height: 1rem;
  border-radius: 0.4rem;

  @include skeleton.pulse(
    $duration: 1.4s,
    $color: #d8deea
  );
}
```

두 mixin은 `prefers-reduced-motion: reduce`에서 animation 반복을 중단합니다.

### VisuallyHidden

실제 `<span>`을 렌더링하며 화면에서는 숨기고 접근성 트리에는 내용을 남깁니다.

```tsx
<button type="button">
  <Icon name="arrow_range" aria-hidden />
  <VisuallyHidden>새로고침</VisuallyHidden>
</button>
```

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
`@uode/validation`의 Zod schema는 Standard Schema를 지원하므로 TanStack
Form validator에 직접 전달할 수 있습니다.

```tsx
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { email } from "@uode/validation";

const form = useForm({
  defaultValues: { email: "" },
  validationLogic: revalidateLogic(),
  onSubmit: ({ value }) => save(value),
});

<form.Field
  name="email"
  validators={{ onDynamic: email }}
  children={(field) => (
    <Field.Root
      invalid={field.state.meta.isTouched && !field.state.meta.isValid}
      required
    >
      <Field.Label>이메일</Field.Label>
      <Field.Control>
        {(controlProps) => (
          <Input
            {...controlProps}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.currentTarget.value)}
          />
        )}
      </Field.Control>
      <Field.Description>로그인에 사용할 주소입니다.</Field.Description>
      {!field.state.meta.isValid ? (
        <Field.Error>이메일을 확인해 주세요.</Field.Error>
      ) : null}
    </Field.Root>
  )}
/>
```

동일한 방식으로 Checkbox의 `checked`, RadioGroup.Item의 `checked`,
NativeSelect.Root의 `value`를 TanStack field에 연결합니다.

```tsx
<form.Field
  name="notifications"
  children={(field) => (
    <Label>
      <Switch
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) =>
          field.handleChange(event.currentTarget.checked)
        }
      />
      알림
    </Label>
  )}
/>
```

텍스트, checkbox, radio, select는 우선 native 요소에 `name`, `value`,
`checked`, `onBlur`, `onChange`, `aria-invalid`를 직접 전달합니다.

전체 조합과 컴포넌트별 기본·커스텀 예시는 Playground의
`/playground/package/base-ui-react/form`에서 확인합니다. Field 페이지는
`displayName`, `email`, `shortText`, `requiredSelection`, `accepted` schema를
TanStack Form 1.33 validator에 주입하는 제출 가능한 예시를 제공합니다.

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
