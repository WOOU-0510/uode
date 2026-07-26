# @uode/base-ui-core

React와 DOM에 의존하지 않는 Base UI 상태 전이와 공통 순수 로직입니다.

## 목차

1. [모듈 경계](#모듈-경계)
2. [공통 모듈](#공통-모듈)
3. [컴포넌트 모듈](#컴포넌트-모듈)
4. [공통화 기준](#공통화-기준)
5. [검증](#검증)

## 모듈 경계

core에 포함할 수 있는 코드는 다음 조건을 모두 만족해야 합니다.

- React hook, Context, JSX를 사용하지 않는다.
- `window`, `document`, DOM element를 사용하지 않는다.
- 입력과 상태에서 다음 상태를 계산할 수 있다.
- React 이외의 adapter에서도 사용할 수 있다.

keyboard event 해석, focus 이동, ref 결합, ARIA 속성은
`@uode/base-ui-react`가 담당합니다.

## 공통 모듈

### `collection`

Accordion과 TreeView처럼 값 목록을 사용하는 상태에서 공유합니다.

- `getUniqueValues`: 입력 순서를 유지하면서 중복 제거
- `areOrderedValuesEqual`: 순서를 포함한 얕은 목록 비교
- `addUniqueValue`: 중복 없이 값 추가
- `removeValue`: 같은 값 제거

### `store`

`useSyncExternalStore`와 연결할 수 있는 최소 store 기반입니다.

- `getSnapshot`
- `subscribe`
- `setSnapshot`
- `updateSnapshot`

## 컴포넌트 모듈

`accordion`, `button`, `popover`, `treeView`는 해당 컴포넌트의 의미를 아는
상태와 전이만 소유합니다. 예를 들어 single Accordion에서 하나만 펼치는 규칙은
`collection`이 아니라 `accordion`에 둡니다.

## 공통화 기준

1. 최소 두 개의 실제 컴포넌트에서 같은 규칙이 반복되는지 확인합니다.
2. 컴포넌트 이름 없이 설명 가능한 순수 로직만 공통 모듈로 이동합니다.
3. 공통 함수가 컴포넌트별 mode나 조건문을 받기 시작하면 도메인에 남깁니다.
4. 미래 사용처를 예상한 추상화는 추가하지 않습니다.

## 검증

```bash
bun run --filter @uode/base-ui-core test
bun run --filter @uode/base-ui-core build
```
