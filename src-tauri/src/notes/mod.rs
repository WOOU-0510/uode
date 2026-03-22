//! **메모 / 지식 베이스** (Obsidian 스타일).
//!
//! - 폴더처럼 카테고리·트리
//! - 폴더별 마크다운 읽기·쓰기
//! - (추후) 링크·그래프 / 노드 뷰용 메타
//!
//! IPC는 `commands`, 파일·파싱·인덱스는 `service`에 두는 식으로 얇게 유지합니다.

pub mod commands;
pub mod service;
