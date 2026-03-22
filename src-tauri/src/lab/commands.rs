//! `/preview`용 샘플 커맨드. 프로덕션 기능에 넣지 않는다.

use serde::{Deserialize, Serialize};

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct AppMetadata {
    pub name: String,
    pub version: String,
    pub platform: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct EchoPayload {
    pub message: String,
    #[serde(default = "default_echo_times")]
    pub times: u32,
}

fn default_echo_times() -> u32 {
    1
}

#[tauri::command]
pub(crate) fn greet(name: &str) -> String {
    format!("Hello, {name}! You've been greeted from Rust.")
}

#[tauri::command]
pub(crate) fn get_app_metadata(app: tauri::AppHandle) -> AppMetadata {
    let info = app.package_info();
    AppMetadata {
        name: info.name.to_string(),
        version: info.version.to_string(),
        platform: std::env::consts::OS.to_string(),
    }
}

#[tauri::command]
pub(crate) fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[tauri::command]
pub(crate) fn echo(payload: EchoPayload) -> Result<String, String> {
    if payload.message.is_empty() {
        return Err("message must not be empty".to_string());
    }
    let n = payload.times.clamp(1, 5);
    Ok(payload.message.repeat(n as usize))
}

#[tauri::command]
pub(crate) fn ping() -> &'static str {
    "pong"
}
