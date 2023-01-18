use tauri::{App, Manager, Window};
use window_vibrancy::{self, NSVisualEffectMaterial, NSVisualEffectState};

/// setup
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let win = app.get_window("main").unwrap();
    set_window_vibrancy(win);
    Ok(())
}

pub fn set_window_vibrancy(win: Window) {
    // 仅在 macOS 下执行
    #[cfg(target_os = "macos")]
    window_vibrancy::apply_vibrancy(
        &win,
        NSVisualEffectMaterial::FullScreenUI,
        Some(NSVisualEffectState::FollowsWindowActiveState),
        Some(12.1),
    )
    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    // 支持win10和win11
    window_vibrancy::apply_acrylic(&win, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_acrylic' is only supported on Windows");
    // 只支持win11
    // window_vibrancy::apply_mica(&win);
}
