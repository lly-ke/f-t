#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::utils::assets::EmbeddedAssets;
use tauri::api::shell;
use tauri::{App, CustomMenuItem, GlobalShortcutManager, Manager, Menu, MenuItem, Submenu, Wry, Context, AboutMetadata};
mod setup;

#[tauri::command]
fn backend_add(number: i32) -> i32 {
    // Note: these commands block the main thread and hang the UI until they return.
    // If you need to run a long-running task, use async command instead.
    println!("Backend was called with an argument: {}", number);
    number + 2
}

// fn register_shortcut(app: &App<Wry>) {
//     let mut short_cut = app.global_shortcut_manager(); //获取快捷键管理实例
//     let app_handler = app.handle();
//     let result = short_cut.register("command+w", move || {
//         let window = app_handler.get_window("main").unwrap();
//         window.close();
//     });
//     if let Err(err) = result {
//         println!("{}", err);
//     }
// }

pub fn init(context: &Context<EmbeddedAssets>) -> Menu {
    // 应用名称
    let name = &context.package_info().name;
    // tauri::Menu::os_default(name)
    // 应用主菜单
    let app_menu = Submenu::new(
        "",
        // MenuItem::About 为原生菜单
        Menu::new().add_native_item(MenuItem::About(name.into(), AboutMetadata::new())),
    );
    // 文件菜单（自定义菜单）
    let file_menu = Submenu::new(
        "File",
        Menu::new()
            .add_item(CustomMenuItem::new("new_file".to_string(), "New File"))
            .add_item(CustomMenuItem::new("edit_file".to_string(), "Edit File")),
    );
    // 编辑菜单（自定义菜单）
    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_item(CustomMenuItem::new("undo".to_string(), "Undo"))
            .add_item(CustomMenuItem::new("redo".to_string(), "Redo")),
    );

    Menu::new()
        .add_submenu(app_menu)
        .add_submenu(file_menu)
        .add_submenu(edit_menu)
}

fn main() {
    let ctx = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![backend_add])
        // .menu(Menu::with_items([
        //     MenuItem::SelectAll.into(),
        //     MenuItem::Redo.into(),
        //     CustomMenuItem::new("toggle", "Toggle visibility").into(),
        //     Submenu::new("View", Menu::new()).into(),
        // ]))
        .menu(init(&ctx))
        .on_menu_event(|event| {
            let event_name = event.menu_item_id();
            match event_name {
                "Online Documentation" => {
                    let url = "https://github.com/Uninen/tauri-vue-template".to_string();
                    shell::open(&event.window().shell_scope(), url, None).unwrap();
                }
                _ => {}
            }
        })
        .setup(setup::init)
        .run(ctx)
        .expect("error while running tauri application");
}
