# uode — 프로젝트 개요

개인용 **도구 모음** 데스크톱 앱. 하나의 제품 안에 서로 다른 성격의 기능을 넣되, 프론트는 FSD·라우트로 영역을 나눈다.

## 스택

- **UI**: Next.js (App Router), React, SCSS 모듈, FSD 지향 구조
- **데스크톱 셸**: Tauri 2 (Rust 백엔드 + WebView)
- **개발·학습용**: Next 라우트 **`/playground`** — `invoke`·컴포넌트 실험 (본 제품 기능과 무관). Rust는 **`src-tauri/src/lab/`** 만 사용.

## 기능 방향 (기획 수준)

### 1. 메모 / 지식 (Obsidian 류)

- 카테고리를 **폴더 트리**처럼 구성 (IDE 사이드바 감성)
- 폴더 단위로 **마크다운** 작성·관리
- (추후) 링크·**노드 그래프** 등 시각화 검토

**Rust 도메인 디렉터리**: `src-tauri/src/notes/` (`commands.rs` = IPC, `service.rs` = 로직)

### 2. 회사 업무 보고

- **주간 / 일간** 보고를 돕는 용도
- 등록한 **GitHub 저장소**들의 **커밋 이력**을 **날짜·시간 범위**로 조회
- **Ollama**로 요약·보고 문안 자동 생성 (범위만 바꿔 일간/주간에 재사용)

**Rust 도메인 디렉터리**: `src-tauri/src/reports/` (`github.rs`, `ollama.rs`, `service.rs`, `commands.rs`)

## Rust 크레이트 구조 (요약)

| 경로 | 역할 |
|------|------|
| `notes/` | 메모·vault·md·(그래프) |
| `reports/` | 깃허브 커밋 + 올라마 보고 |
| `shared/` | 공용 경로·에러·HTTP 등 |
| `lab/` | **학습·플레이그라운드 전용** IPC (`/playground`에서만 사용 예정) |

프론트에서 도메인 기능을 붙일 때: 해당 도메인의 `commands.rs`에 `#[tauri::command]`를 두고, `lib.rs`의 `generate_handler!`에 등록한다.

## 이 문서의 목적

기획이 아직 유동적일 때도 **방향과 폴더 역할**을 한곳에 적어 두기 위함. 제품 스펙 문서가 아니라 **개발자(본인)용 메모**에 가깝다.

## 관련 문서

- 개발 규칙/구조 기준: `docs/architecture.md`
