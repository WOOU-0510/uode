# Base UI 컴포넌트 계획

- 상태: P1·P1.5 구현 완료
- 최종 수정: 2026-07-28
- 대상: `packages/base-ui/core`, `packages/base-ui/react`, `apps/desktop`

## 목차

1. [목표](#목표)
2. [참고 범위](#참고-범위)
3. [프로젝트 전제](#프로젝트-전제)
4. [설계 원칙](#설계-원칙)
5. [현재 제공 컴포넌트](#현재-제공-컴포넌트)
6. [구현 우선순위](#구현-우선순위)
7. [HTML 기반 구현 원칙](#html-기반-구현-원칙)
8. [core 모듈 구조](#core-모듈-구조)
9. [React 패키지 구조](#react-패키지-구조)
10. [완료 기준](#완료-기준)

## 목표

제품에서 반복해서 필요한 최소 단위의 headless UI를 제공한다. 특정 화면이나
상태 관리 라이브러리에 종속된 완성형 위젯보다 작고 조합 가능한 컴포넌트를
우선한다.

브라우저와 HTML이 이미 올바르게 제공하는 동작과 상태는 다시 만들지 않는다.
HTML 요소가 존재한다는 이유만으로 Base UI 컴포넌트 후보에서 제외하지는 않는다.
반복되는 props·ref·접근성·조합·스타일 계약에 가치가 있다면 실제 HTML 요소를
기반으로 컴포넌트를 제공한다.

## 참고 범위

컴포넌트 종류를 빠뜨리지 않기 위한 목록 참고 순서는 다음과 같다.

1. [shadcn/ui Components](https://ui.shadcn.com/docs/components)
2. [Base UI](https://base-ui.com/react/overview/about)
3. [Radix Primitives](https://www.radix-ui.com/primitives/docs/components)
4. [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html)
5. [Ariakit](https://ariakit.org/components)

참고 라이브러리에서는 **어떤 컴포넌트가 존재하는지만 확인한다**. 구현 코드,
상태 구조, 스타일, 외부 primitive 의존성은 복사하거나 설계 근거로 사용하지
않는다.

## 프로젝트 전제

- 웹 런타임은 React 19와 Next.js App Router를 사용한다.
- 폼 상태와 검증 연결은 TanStack Form이 담당한다.
- 테이블의 정렬, 필터링, 페이지네이션, 선택 상태는 TanStack Table이 담당한다.
- `@uode/base-ui-core`는 React와 DOM에 의존하지 않는다.
- `@uode/base-ui-react`는 DOM, ARIA, focus, keyboard, Context 연결을 담당한다.
- 원본 SVG 같은 공유 source asset은 `@uode/assets`에 두고, 생성된 React
  컴포넌트만 `@uode/base-ui-react`에 둔다.
- 스타일은 소비처의 CSS Module을 기본으로 하고 패키지 스타일은 최소화한다.

TanStack Form이나 TanStack Table을 감싸서 자체 상태 엔진을 만들지 않는다.
대신 각 라이브러리가 제공하는 값과 이벤트 핸들러를 HTML props 또는 명시적인
controlled props로 전달할 수 있어야 한다.

## 설계 원칙

### 1. HTML 우선

- `<button>`, `<input>`, `<textarea>`, `<select>`, `<table>`, `<dialog>`,
  `<details>`, `<summary>`, `<progress>`, `<meter>` 등으로 해결되는 기능은
  그대로 사용한다.
- 기본 요소 위에 스타일만 필요한 경우 headless 패키지 컴포넌트를 추가하지
  않는다.
- 브라우저 기본 동작을 대체하는 구현은 실제 제품 요구가 확인된 뒤에만 추가한다.

### 2. DOM props 전달

각 컴포넌트의 props는 실제 렌더링하는 HTML 요소의 props에서 출발한다.

```ts
type ItemProps = React.ComponentPropsWithRef<"div"> & {
  value: string;
};
```

- `className`, `style`, `data-*`, `aria-*`, 이벤트 핸들러와 React 19 `ref`를
  전달할 수 있어야 한다.
- 라이브러리가 직접 소유하는 충돌 속성만 `Omit`한다.
- 내부 이벤트보다 사용자가 전달한 이벤트를 먼저 실행한다.
- 사용자가 `event.preventDefault()`를 호출하면 기본 내부 동작을 중단한다.

### 3. 상태는 명시적인 props 계약으로 제공

컴포넌트가 HTML에 없는 상태를 소유해야 한다면 다음 형태를 사용한다.

- uncontrolled: `defaultValue`
- controlled: `value`
- 변경 통지: `onValueChange`
- 불리언 상태: `defaultOpen`, `open`, `onOpenChange`
- 목록 상태: `defaultExpandedValues`, `expandedValues`,
  `onExpandedValuesChange`

시각적 variant나 제품 정책을 boolean props로 계속 늘리지 않고 children과
compound component 조합을 사용한다.

- 상태형 컴포넌트는 core store를 `React.useSyncExternalStore`로 구독하는
  선택적 `useState` adapter를 제공한다.
- Root의 controlled props가 공식 UI 계약이며 `useState` 반환값, 일반 React
  state, TanStack 상태 또는 다른 store를 동일하게 주입할 수 있다.

### 4. 작고 범용적인 단위를 먼저 구현

- 하나의 접근성 동작 또는 하나의 상태 전이만 책임지는 단위를 우선한다.
- 여러 primitive를 조합한 완성형 위젯은 실제 소비처가 생길 때 만든다.
- 두 컴포넌트 이상에서 반복되는 순수 로직만 공통 core 모듈로 올린다.
- 화면 이름, API 응답 타입, TanStack 인스턴스 타입을 base-ui에 넣지 않는다.

### 5. React와 Next.js

- React 19에서 ref는 일반 prop으로 받으며 `forwardRef`를 사용하지 않는다.
- Context는 `React.use(Context)`로 읽는다.
- DOM 접근은 이벤트나 effect 이후에만 수행해 SSR에서 안전하게 유지한다.
- 상호작용 컴포넌트의 client boundary는 패키지 진입점에서 명확하게 제공한다.
- Next.js의 Server Component에서는 직렬화 가능한 상태만 내려주고 이벤트
  핸들러를 사용하는 조합은 Client Component에서 작성한다.

### 6. asset과 번들 경계

- 원본 asset과 런타임 컴포넌트를 분리한다. SVG 원본은 생성 도구의 입력이지
  애플리케이션의 런타임 의존성이 아니다.
- 아이콘은 파일별 생성물과 개별 import 경로를 기본으로 제공한다. 한 아이콘을
  사용하기 위해 전체 registry를 import하게 만들지 않는다.
- 문자열 `name`으로 찾는 동적 registry는 모든 아이콘을 포함해야 하므로
  명시적인 opt-in API로만 유지한다.
- 패키지 루트의 단일 bundle이 개별 아이콘까지 합치지 않도록 아이콘 subpath
  export 또는 preserve-modules 방식의 build를 사용한다.
- 실제 소비 앱의 production build에서 사용한 아이콘만 포함되는지 출력
  chunk로 검증한다.

## 현재 제공 컴포넌트

| 컴포넌트 | 책임 | 상태 |
|---|---|---|
| Button | 일반 버튼과 `aria-pressed` 토글 버튼 | 제공 |
| Accordion | 단일/다중 확장 영역 | 제공 |
| Popover | replace/stack 방식 패널 surface | 제공 |
| TreeView | 단일 선택 트리와 키보드 탐색 | 제공 |
| Icon | SVG 아이콘 렌더링 | 제공, 색상·animation·개별 entry 보완 예정 |
| Pretext | 텍스트 블록 높이와 줄 수 측정 | 제공 |
| Label, Input, Textarea | native 폼 요소의 props와 ref 전달 | 제공 |
| Field | label, description, error와 control의 접근성 연결 | 제공 |
| Checkbox, RadioGroup, Switch | native 선택 상태와 폼 의미 유지 | 제공 |
| NativeSelect | native select, option, optgroup 조합 | 제공 |
| Skeleton | 상태 없는 로딩 레이아웃과 animation hook | 제공 |
| VisuallyHidden | 시각적으로 숨긴 접근성 텍스트 | 제공 |

상세 사용법은
[`packages/base-ui/react/docs/components.md`](../../packages/base-ui/react/docs/components.md)
에서 관리한다.

## 구현 우선순위

### P1. 폼과 로딩 피드백 primitive (구현 완료)

| 순서 | 후보 | 필요한 이유 | 범위 |
|---|---|---|---|
| 1 | Label, Input, Textarea | 거의 모든 폼에서 반복되고 TanStack Form과 직접 연결됨 | 실제 `<label>`, `<input>`, `<textarea>`의 props와 ref를 그대로 전달하며 값 상태를 소유하지 않음 |
| 2 | Field | label, description, error와 control의 접근성 연결 | form value·validation 없이 id, `aria-describedby`, `aria-invalid` 조합만 담당 |
| 3 | Skeleton | 페이지, 목록, 카드의 로딩 레이아웃을 일관되게 표현 | 내부 loading 상태 없이 HTML props와 shape/style hook 제공, animation은 `@uode/styles`에서 조절 |
| 4 | Checkbox, RadioGroup | 선택형 폼의 native semantics와 스타일 지점 제공 | native checkbox/radio, `fieldset`, `legend` 기반이며 checked 상태는 소비처가 소유. indicator part 제공 |
| 5 | Switch | boolean 설정 UI에서 반복 사용 | `<input type="checkbox" role="switch">` 기반, 별도 boolean 상태 엔진 없이 track/thumb 조합 제공 |
| 6 | NativeSelect | 기본 선택 UI에 일관된 props·ref·스타일 계약 제공 | 실제 `<select>`, `<option>`, `<optgroup>` 기반 |
| 7 | VisuallyHidden | 아이콘 컨트롤과 상태 설명에 반복되는 접근성 텍스트 | 스타일과 HTML props 전달만 제공 |

초기 폼 컴포넌트는 `@uode/base-ui-react`가 TanStack Form을 import하지 않는다.
TanStack Form의 `value`, `checked`, `onChange`, `onBlur`, validation 결과를 native
props와 Field의 명시적인 상태 props에 주입한다.

### P1.5. 기존 컴포넌트 보완 (구현 완료)

새 interaction primitive를 늘리기 전에 현재 소비 API의 표현력과 bundle 경계를
먼저 보완한다.

| 순서 | 대상 | 보완 범위 |
|---|---|---|
| 1 | Icon asset 경계 | 원본 SVG를 `packages/assets/icons`로 이동하고 생성 스크립트의 build-time 입력으로만 사용 |
| 2 | Icon bundle | 파일별 생성물과 subpath export를 제공하고 동적 registry는 opt-in으로 분리 |
| 3 | Icon 색상 | 단색은 `currentColor`, 다색은 원본 보존 또는 명시적인 CSS palette variable을 사용 |
| 4 | Icon animation/filter | root transform·opacity·filter와 path별 stroke animation 지점을 구분하고 reduced-motion을 지원 |
| 5 | Checkbox·RadioGroup·Switch | native input을 상태·폼·접근성의 원본으로 유지하면서 indicator, track, thumb 등 커스텀 외형 조합 지점 제공 |
| 6 | Playground | Icon과 선택형 control의 기본형·커스텀형·경계 상태를 실제 상호작용 예시로 검증 |

#### Icon 색상과 효과 원칙

- 생성 시 모든 색을 무조건 `currentColor`로 치환하지 않는다.
- 단색 아이콘은 fill 또는 stroke를 `currentColor`로 정규화한다.
- gradient, 여러 fill/stroke 색, mask, filter를 포함한 다색 아이콘은 원본을
  보존한다. 테마 변경이 필요한 색은 `--icon-color-1`,
  `--icon-color-2` 순서의 CSS variable palette로 덮어쓴다.
- CSS `filter`는 root SVG 전체에 적용할 수 있지만 다색 아이콘의 각 색을
  의미 있게 교체하는 API로 취급하지 않는다.
- stroke drawing은 stroke path와 path length가 있는 아이콘에서만 가능하다.
  모든 아이콘에 동작하는 `animated` boolean prop을 만들지 않고, 생성된
  path의 `data-icon-part`와 className/CSS animation을 조합한다.
- gradient, mask, filter의 document-global id가 여러 Icon instance 사이에서
  충돌하지 않도록 생성 단계에서 고유 id 전략을 적용한다.
- Icon Playground에는 크기와 단색 변경, 다색·gradient 보존, CSS palette
  override, root filter, stroke animation, reduced-motion, 같은 아이콘의 반복
  instance를 각각 독립 예시로 제공한다.

#### 선택형 form control 원칙

- Checkbox, RadioGroup, Switch의 값, checked, required, disabled, FormData,
  keyboard 동작은 계속 native input이 담당한다.
- 기본 브라우저 외형을 강제하지 않는다. native input을 시각적으로 숨기거나
  `appearance: none`으로 스타일할 수 있고, indicator·track·thumb를 children
  또는 compound part로 조합할 수 있어야 한다.
- 커스텀 외형을 위해 checked 상태 store나 synthetic hidden input을 별도로
  만들지 않는다. CSS `:checked`, `:indeterminate`, `:disabled`,
  `:focus-visible`과 인접 part를 우선 사용한다.
- Input과 Textarea는 props/ref 전달 primitive로 유지한다. 날짜 grid,
  범위 선택, 월 이동처럼 native input 밖의 동작은 별도 Calendar/DatePicker가
  담당한다.
- Checkbox, RadioGroup, Switch Playground에는 native 기본형과 custom
  indicator/track/thumb 조합을 함께 제공하고 checked, unchecked,
  indeterminate, disabled, required, focus-visible 상태와 FormData 제출을
  확인한다.
- Calendar/DatePicker 구현 시 native date input과 custom calendar를 나란히
  제공하고 날짜 선택, 월 이동, keyboard 탐색, disabled date, 단일·범위 선택을
  요구 범위에 맞게 검증한다.

### P2. interaction 기반 primitive

| 후보 | 필요한 이유 | 범위 |
|---|---|---|
| Portal | overlay 렌더 위치 분리 | target과 children만 담당 |
| FocusScope | overlay 내부 focus 진입·복원 | 공통 React 내부 primitive 우선 |
| RovingFocusGroup | Tabs, Menu, Toolbar의 공통 방향키 이동 | 방향·loop·현재 값만 담당 |

`FocusScope`와 `RovingFocusGroup`은 먼저 내부 primitive로 사용하고 독립적인
공개 API 요구가 확인될 때만 export한다.

### P3. 범용 interaction component

| 후보 | 필요한 이유 | 선행 조건 |
|---|---|---|
| Tooltip | hover와 keyboard focus에서 보조 설명 제공 | Portal, focus/dismiss 공통 로직 |
| Tabs | 동일 화면 안의 패널 전환 | RovingFocusGroup |
| Menu | 명령 목록의 focus, typeahead, disabled 처리 | RovingFocusGroup, focus 복원 |
| ContextMenu | TreeView 등에서 포인터 위치 기반 명령 제공 | Menu |
| Toast | 비동기 작업 결과를 화면 이동 없이 알림 | live region과 queue 정책 |
| ToggleGroup | 여러 `aria-pressed` 버튼의 단일/다중 선택 | Button, RovingFocusGroup |

Dropdown Menu는 별도 상태 엔진으로 만들지 않고 Menu와 trigger/positioning을
조합한다.

### P4. collection과 제품 요구 기반

| 후보 | 필요한 이유 | 구현 판단 |
|---|---|---|
| Combobox | 많은 옵션의 검색과 선택 | native input/datalist로 부족할 때 |
| Custom Select | option 표현과 검색이 필요한 선택기 | native select로 부족할 때 |
| Command | 검색 가능한 명령 collection | Menu/Combobox로 표현하기 어려울 때 |
| ResizablePanel | 노트 탐색기와 편집기 크기 조정 | 실제 레이아웃 요구 확정 후 |
| Calendar/DatePicker | 일관된 custom calendar UI, 복합 날짜 규칙과 범위 선택 | native date input은 단순 입력에 유지하고 custom UI 요구가 있으면 Calendar와 trigger/input 조합인 DatePicker를 별도로 구현 |
| Pagination | 서버/클라이언트 목록 탐색 UI | 상태 없이 링크·버튼 조합으로 제공 |

### P5. 조합형 또는 제품 전용

Drawer, Sheet, HoverCard, NavigationMenu, Menubar, Sidebar, Carousel, Chart,
OTP, DropZone, Attachment, Message 계열은 atomic primitive가 아니거나 현재 제품
요구가 명확하지 않다. 필요한 primitive가 안정된 뒤 실제 소비처와 함께 설계한다.

## HTML 기반 구현 원칙

다음 항목은 컴포넌트 생성을 금지하는 목록이 아니다. Base UI 컴포넌트로
제공하더라도 아래 HTML/CSS를 실제 기반으로 사용하고, 브라우저가 가진 동작과
상태를 별도 엔진으로 중복 구현하지 않는다.

| 컴포넌트 범주 | 실제 기반 | Base UI가 추가할 수 있는 범위 |
|---|---|---|
| Input, Textarea, Label | `<input>`, `<textarea>`, `<label>` | props/ref 전달, 접근성·스타일 계약 |
| Checkbox, RadioGroup | native checkbox/radio와 `<fieldset>`, `<legend>` | native 상태를 유지하는 indicator와 custom control 조합 |
| Switch | `<input type="checkbox" role="switch">` | native checked를 유지하는 track/thumb 조합 |
| Native Select | `<select>`, `<option>`, `<optgroup>` | props/ref 전달과 compound export |
| Skeleton, Spinner | 일반 semantic HTML과 CSS animation | shape/style hook과 접근성 사용 규칙 |
| Table | `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` | 제품 스타일 요구가 확인되기 전에는 별도 상태 엔진 없음 |
| Dialog, AlertDialog | `<dialog>`와 `showModal()`, `close()` | native 기능으로 부족한 요구가 생길 때 재검토 |
| Collapsible | `<details>`, `<summary>` | native 기능으로 충분하면 상태 엔진 없음 |
| Progress, Meter | `<progress>`, `<meter>` | props/ref와 스타일 계약 |
| Separator | `<hr>` 또는 CSS border | semantic orientation이 반복될 때 얇은 primitive 허용 |
| ScrollArea | CSS `overflow` | custom scrollbar 동작이 필요할 때만 재검토 |
| AspectRatio | CSS `aspect-ratio` | 스타일 utility 우선 |
| Badge, Card, Item, Typography | 일반 semantic HTML과 CSS | 반복되는 디자인 계약이 생기면 styled 계층에서 검토 |

Table의 semantic markup만 base-ui에서 다시 감싸지 않는다. TanStack Table의
headless 상태를 소비처에서 native table 또는 필요한 grid markup에 직접
연결한다. 반복되는 제품 스타일이 확인되면 base-ui가 아니라 별도 styled UI
계층을 검토한다.

## core 모듈 구조

```text
packages/base-ui/core/src/
├─ collection/  # 고유 값 목록, 순서 비교, 추가·제거
├─ store/       # 외부 store의 최소 subscribe/snapshot 기반
├─ accordion/   # Accordion 상태 전이
├─ button/      # Button 상태 전이
├─ popover/     # Popover panel stack
├─ treeView/    # TreeView 확장·focus·선택 상태
└─ ...
```

- `collection`, `store`처럼 여러 도메인이 사용하는 순수 로직은 공통 모듈에 둔다.
- 컴포넌트 의미를 알아야 하는 규칙은 각 컴포넌트 폴더에 둔다.
- DOM query, ref, keyboard event 해석은 core에 넣지 않는다.
- 공통화는 최소 두 개의 실제 사용처가 있을 때 수행한다.
- 공통 모듈이 컴포넌트별 조건문을 가지기 시작하면 다시 도메인으로 내린다.

현재 Accordion과 TreeView에서 반복되던 고유 값 목록 정규화, 순서 비교,
추가·제거 로직은 `core/src/collection`으로 분리했다.

## React 패키지 구조

컴포넌트 폴더와 구현 파일은 lower camelCase를 사용한다. `index.ts`처럼 도구가
요구하는 파일명은 예외다.

```text
treeView/
├─ components/
│  ├─ root/root.tsx
│  ├─ item/item.tsx
│  └─ group/group.tsx
├─ treeView.compound.tsx
├─ treeView.context.tsx
├─ treeView.item.context.tsx
├─ treeView.hook.ts
├─ treeView.item.hook.ts
├─ treeView.types.ts
├─ treeView.dom.ts
└─ index.ts
```

새 compound component는 기존 Accordion, Button, Popover와 같은 구조를
따른다. 단일 파일로 시작할 수는 있지만 context, 공개 type, 하위 component가
분리될 정도로 커지면 위 구조로 맞춘다.

## 완료 기준

- 공개 컴포넌트가 렌더링하는 HTML 요소의 props와 React 19 ref를 전달받는다.
- 라이브러리 상태가 controlled/uncontrolled 계약으로 타입에 드러난다.
- 사용자 이벤트의 `preventDefault()`가 내부 동작을 취소한다.
- core의 순수 상태 전이에 테스트가 있다.
- 변경 패키지의 type check와 build가 통과한다.
- 상호작용 컴포넌트는 Playground에서 mouse와 keyboard로 확인한다.
- 공개 컴포넌트 또는 기존 컴포넌트 보완에는 Playground의 무스타일 기본형,
  커스텀형, disabled·focus 등 주요 경계 상태 예시가 함께 추가된다.
- HTML 기본 기능이나 TanStack Form/Table의 상태 엔진을 중복 구현하지 않는다.

## 변경 기록

- 2026-07-24: 최초 계획 작성.
- 2026-07-26: TreeView 구현, Dialog 제외, core/react 분리.
- 2026-07-26: shadcn/ui를 목록 조사 1순위로 변경하고 atomic·HTML 우선,
  TanStack Form/Table 및 React/Next 호환 원칙을 반영.
- 2026-07-26: 공통 collection core 모듈과 TreeView 표준 폴더 구조를 적용.
- 2026-07-27: 모든 상태형 컴포넌트에 외부 상태 생성 hook을 추가하고
  Playground의 controlled 예시를 core store 주입 방식으로 변경.
- 2026-07-27: HTML 우선 원칙을 “컴포넌트 제외”가 아니라 “native 동작과 상태를
  재구현하지 않음”으로 수정하고, 폼 primitive와 Skeleton을 P1으로 상향.
- 2026-07-27: Label, Input, Textarea, Field, Checkbox, RadioGroup, Switch,
  NativeSelect, Skeleton, VisuallyHidden을 구현하고 문서와 Playground 예시를 추가.
- 2026-07-27: Form Playground를 컴포넌트별 페이지로 분리하고 각 페이지에
  무스타일 기본형과 커스텀형을 추가. Field 페이지에 TanStack Form과
  `@uode/validation`을 조합한 validation 예시를 추가.
- 2026-07-27: 동적 `[component]` Form Playground를 제거하고 컴포넌트별
  정적 route가 각자의 page, example logic, style을 소유하도록 co-location.
- 2026-07-28: Icon 원본을 `packages/assets`로 분리하고 단색·다색·animation,
  SVG id, 개별 entry와 registry의 bundle 경계를 보완하는 계획을 추가.
- 2026-07-28: Checkbox, RadioGroup, Switch는 native 상태를 유지하면서
  커스텀 indicator/track/thumb를 조합하도록 보완하고, custom DatePicker를
  native date input과 별도 컴포넌트로 계획.
- 2026-07-28: Icon과 선택형 form control 보완 및 향후 Calendar/DatePicker의
  기본형·커스텀형·경계 상태를 Playground 필수 검증 범위로 추가.
- 2026-07-28: P1.5를 구현. Icon 원본과 React 생성물을 분리하고 개별 subpath,
  opt-in registry, 단색·다색 palette, 고유 SVG id와 animation part를 제공.
  Checkbox, RadioGroup, Switch에는 native control과 함께 쓰는
  Indicator·Track·Thumb를 추가하고 Playground에서 FormData까지 검증.
