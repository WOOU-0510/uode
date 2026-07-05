mod lab;
mod notes;
mod reports;
mod shared;
mod window_state;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| window_state::restore_main_window(app))
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                window_state::save_main_window(window);
            }
        })
        .invoke_handler(tauri::generate_handler![
            lab::commands::greet,
            lab::commands::get_app_metadata,
            lab::commands::add,
            lab::commands::echo,
            lab::commands::ping,
        ])
        .run(tauri::tauri_build_context!())
        .expect("error while running tauri application");
}
