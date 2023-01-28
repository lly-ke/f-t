use log::{debug, info, warn};
use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, SystemTraySubmenu,
};

pub fn menu() -> SystemTray {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("show".to_string(), "显示")) // 显示应用窗口
        .add_item(CustomMenuItem::new("hide".to_string(), "隐藏")) // 隐藏应用窗口
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "退出")); // 退出应用

    SystemTray::new().with_menu(tray_menu)
}

pub fn handler(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { tray_id, id, .. } => {
            debug!("SystemTrayEvent::MenuItemClick: {}, {}", tray_id, id);

            match id.as_str() {
                // 显示隐藏窗口顺序会不一样, 没官方显示隐藏api先这样吧
                "show" => {
                    app.windows().iter().for_each(|(_, w)| {
                        w.set_focus().unwrap();
                        w.show().unwrap();
                    });
                    // app.show().unwrap();
                }
                "hide" => {
                    app.windows().iter().for_each(|(_, w)| {
                        w.hide().unwrap();
                    });
                    // app.hide().unwrap();
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            }
        }
        _ => {}
    };
}
