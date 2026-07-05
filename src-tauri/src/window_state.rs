use std::path::PathBuf;

use serde::{Deserialize, Serialize};
use tauri::{Manager, PhysicalPosition, PhysicalSize, Runtime, Window};

const MAIN_WINDOW_LABEL: &str = "main";
const STATE_FILE_NAME: &str = "window-state.json";
const MIN_WIDTH: u32 = 320;
const MIN_HEIGHT: u32 = 240;

#[derive(Debug, Clone, Copy, Deserialize, Serialize)]
struct WindowState {
    x: i32,
    y: i32,
    width: u32,
    height: u32,
    maximized: bool,
}

impl WindowState {
    const fn is_restorable(&self) -> bool {
        self.width >= MIN_WIDTH && self.height >= MIN_HEIGHT
    }
}

pub(crate) fn restore_main_window(app: &tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let Some(window) = app.get_webview_window(MAIN_WINDOW_LABEL) else {
        return Ok(());
    };

    let path = state_path(app.handle())?;
    if !path.exists() {
        return Ok(());
    }

    let state = serde_json::from_str::<WindowState>(&std::fs::read_to_string(path)?)?;
    if !state.is_restorable() {
        return Ok(());
    }

    window.set_size(PhysicalSize::new(state.width, state.height))?;
    window.set_position(PhysicalPosition::new(state.x, state.y))?;
    if state.maximized {
        window.maximize()?;
    }

    Ok(())
}

pub(crate) fn save_main_window<R: Runtime>(window: &Window<R>) {
    if window.label() != MAIN_WINDOW_LABEL {
        return;
    }

    let _ = save_window(window);
}

fn save_window<R: Runtime>(window: &Window<R>) -> Result<(), Box<dyn std::error::Error>> {
    let position = window.outer_position()?;
    let size = window.outer_size()?;
    let state = WindowState {
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
        maximized: window.is_maximized()?,
    };

    if !state.is_restorable() {
        return Ok(());
    }

    let path = state_path(window.app_handle())?;
    std::fs::write(path, serde_json::to_vec_pretty(&state)?)?;

    Ok(())
}

fn state_path<R: Runtime>(
    app: &tauri::AppHandle<R>,
) -> Result<PathBuf, Box<dyn std::error::Error>> {
    let dir = app.path().app_data_dir()?;
    std::fs::create_dir_all(&dir)?;
    Ok(dir.join(STATE_FILE_NAME))
}

#[cfg(test)]
mod tests {
    use super::WindowState;

    #[test]
    fn state_is_restorable_when_size_meets_minimum() {
        let state = WindowState {
            x: 100,
            y: 80,
            width: 320,
            height: 240,
            maximized: false,
        };

        assert!(state.is_restorable());
    }

    #[test]
    fn state_is_not_restorable_when_size_is_too_small() {
        let state = WindowState {
            x: 100,
            y: 80,
            width: 319,
            height: 240,
            maximized: false,
        };

        assert!(!state.is_restorable());
    }
}
