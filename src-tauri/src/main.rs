#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod setup;
mod commands;

fn main() {
    let ctx = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![commands::backend_add])
        .setup(setup::init)
        .run(ctx)
        .expect("error while running tauri application");
}
