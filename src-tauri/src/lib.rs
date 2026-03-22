mod notes;
mod reports;
mod shared;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        // 첫 `#[tauri::command]` 추가 시:
        // .invoke_handler(tauri::generate_handler![ notes::commands::foo, ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
