# uode — 아키텍처 & 코드 규칙

이 문서는 **현재 저장소의 코드 구조를 “왜 이렇게 두는지”**를 기록합니다.  
기획/기능 자체의 방향은 `docs/project-overview.md`를 참고하고, 이 문서는 **개발 시 의사결정 기준(규칙)**을 다룹니다.

## 목표

- **기능이 늘어나도 폴더/책임이 흐려지지 않게** 한다.
- “지금 당장 필요한 것”보다, **추후 확장/교체가 쉬운 경계**를 만든다.
- Playground는 제품 기능이 아니라 **실험/예시/학습을 위한 공간**으로 명확히 분리한다.

## 전체 구조 (큰 그림)

- **프론트엔드**: Next.js App Router 기반
  - `src/app/`: 라우트(페이지)와 라우트 내부 전용 UI/로직
  - `src/shared/`: 범용 유틸, 공용 라이브러리 래퍼, 전역 스타일 토대, 공용 자산
  - `src/widgets/`, `src/features/`, `src/entities/`: FSD 지향 레이어(필요에 따라 확장)
- **데스크톱 셸**: Tauri 2 (Rust)
  - 도메인별 디렉터리 + `commands.rs`(IPC) / `service.rs`(로직) 패턴
  - Playground에서만 쓰는 학습용 IPC는 `src-tauri/src/lab/`에 모은다

## Next.js 라우팅 규칙

### Route group

- `app/(dev)/...` 같은 **route group**은 URL에 노출되지 않는다.
- 따라서 실제 URL은 `/playground/...` 형태가 된다.

### Playground 라우트의 성격

- `/playground`는 제품 기능이 아닌 **개발·학습용 라우트**다.
- 목적:
  - Tauri `invoke`/window API 같은 “환경 의존” 기능을 빠르게 실험
  - 컴포넌트/패턴을 **예시로 남기거나** 검증

## 코로케이션(co-location) 기준

### 원칙

- **“해당 라우트에서만 의미가 있는 코드”는 그 라우트 폴더 안에 둔다.**
- 반대로, 여러 라우트/도메인에서 재사용할 가능성이 높으면 `shared/` 또는 상위 레이어로 올린다.

### Playground 내비게이션 예시

`app/(dev)/playground/config/`는 playground 라우트에만 필요한 설정/유틸을 코로케이션한다.

- `config/navigation.ts`: 사이드바 내비 트리 정의
- `config/navigationActive.util.ts`: 현재 경로 기반 활성화 판정
- `config/index.ts`: 외부 노출을 위한 barrel

## 스타일(CSS) 규칙

### 글로벌 레이어 사용 범위

전역 `@layer`는 **토대**에만 사용한다.

- 사용 위치:
  - `src/shared/styles/global/order.scss`에서 레이어 선언 순서만 관리
  - (예: reset/vendor/base 및 추후 UI-kit 레이어)
- 사용하지 않는 위치:
  - `app` / `widgets` / `features` / `entities`의 **CSS Module 내부**
  - CSS Module은 모듈 스코프 자체로 충분하므로 `@layer`를 두지 않는다

## 상태 관리 기준 (로컬 state vs Store/Provider)

### 기본 원칙

상태는 가능한 한 **가까운 곳(컴포넌트 로컬)** 에 둔다.

- 한 컴포넌트 내부에서만 쓰는 값: `useState` / `useReducer`
- 폼 상태: 해당 폼 컴포넌트(또는 폼 섹션) 내부에서 관리
- 단순 UI 토글/입력값: 로컬 상태가 기본

### Store/Provider를 허용하는 조건

다음 중 하나라도 명확하면 Store(컨텍스트 포함)를 고려한다.

- **공유 범위가 넓다**: 여러 컴포넌트(형제/하위)가 같은 상태를 읽고/쓴다
- **페이지 단위로 상태를 유지·리셋**해야 한다 (라우트 생명주기와 맞춘다)
- **행동 규칙이 재사용**된다:
  - 예: `runInvoke`처럼 “실행 + 에러 처리 + 환경 체크”를 묶어서 여러 섹션에서 공통으로 사용
- **렌더 범위 제어**가 필요하다:
  - selector/shallow pick으로 불필요한 리렌더를 줄여야 한다

### `shared/lib/zustand/createStore.tsx` 패턴의 의미

이 프로젝트의 Store 패턴은 다음을 한 번에 제공한다.

- React Context로 Store 주입
- zustand vanilla store 생성/보관
- 필요한 키만 shallow pick 하는 훅 제공

즉, “어디서든 전역 접근”을 만들기 위한 패턴이 아니라, **“정해진 트리 범위에서만 공유되는 store”**를 안전하게 만드는 패턴이다.

### Playground에서의 Store 사용에 대한 입장

Playground는 두 가지 방향이 모두 가능하다.

- **A. 예시/패턴 데모 존**
  - store/provider 패턴을 “예시로 남길 가치”가 있으면 유지한다
  - 대신 문서로 “이건 데모 목적”임을 명시한다
- **B. 현실적인 구현 존**
  - 섹션별로 로컬 state로 내리고, 정말 공유가 필요할 때만 페이지 store로 올린다

현재 저장소에서는 “데모로서의 가치”가 있어 스토어를 남기고 싶다는 의도가 있으므로,  
추후 리팩터링은 **이 문서의 기준을 먼저 고정한 뒤** 진행하는 것을 권장한다.

## 파일 확장자 규칙 (`.ts` vs `.tsx`)

- **JSX가 있으면 `.tsx`**
- JSX가 없으면 **`.ts`**
- `"use client"`는 `.ts`에도 동일하게 사용 가능하다

특히 store 파일처럼 JSX가 없는 모듈은 `.ts`가 기본이며, JSX는 `createStore.tsx` 같은 “Provider 구현부”에만 존재할 수 있다.

## 커밋 메시지 규칙

- 커밋 메시지는 **한국어**로 작성한다.
- 자세한 가이드는 `docs/commit-message-guide.md` 참고.

