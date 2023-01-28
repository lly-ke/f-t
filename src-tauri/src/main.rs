#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use env_logger::{Builder, Target};

mod commands;
mod setup;
mod tray;

fn main() {
    log_init();

    let ctx = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::set_window_vibrancy_backend
        ])
        .setup(setup::init)
        .system_tray(tray::menu())
        .on_system_tray_event(tray::handler)
        .run(ctx)
        .expect("error while running tauri application");
}

fn log_init() {
    let mut builder = Builder::from_default_env();
    builder.target(Target::Stdout);

    builder.init();
}
