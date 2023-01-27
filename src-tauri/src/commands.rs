use tauri::Manager;

use crate::setup::set_window_vibrancy;

#[tauri::command]
pub fn set_window_vibrancy_backend(app_handle: tauri::AppHandle, label: String) {
    let win = app_handle.get_window(&label);
    if let Some(w) = win {
        set_window_vibrancy(w);
    } else {
        println!("No window found with label: {}", label);
    }
}
