//! **회사 업무 보고** (주간·일간).
//!
//! - 등록된 GitHub 저장소들의 커밋 로그를 날짜·시간 범위로 조회 (`github`)
//! - Ollama로 요약·보고 문안 생성 (`ollama`)
//! - 흐름 조합은 `service`, IPC는 `commands`.

pub mod commands;
pub mod github;
pub mod ollama;
pub mod service;
