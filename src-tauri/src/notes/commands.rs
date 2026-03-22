//! 프론트 `invoke` 대상 `#[tauri::command]`만 둡니다. 구현은 `super::service`에 위임합니다.
//! 등록: `lib.rs`에서 `.invoke_handler(tauri::generate_handler![ notes::commands::…, … ])`.
