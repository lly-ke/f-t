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

use std::fs;
use std::fs::metadata;
use std::path::PathBuf;
use std::process::Command;

#[tauri::command]
pub fn show_in_folder(path: String) {
  #[cfg(target_os = "windows")]
  {
    Command::new("explorer")
        .args(["/select,", &path]) // The comma after select is not a typo
        .spawn()
        .unwrap();
  }

  #[cfg(target_os = "linux")]
  {
    if path.contains(",") {
      // see https://gitlab.freedesktop.org/dbus/dbus/-/issues/76
      let new_path = match metadata(&path).unwrap().is_dir() {
        true => path,
        false => {
          let mut path2 = PathBuf::from(path);
          path2.pop();
          path2.into_os_string().into_string().unwrap()
        }
      };
      Command::new("xdg-open")
          .arg(&new_path)
          .spawn()
          .unwrap();
    } else {
      Command::new("dbus-send")
          .args(["--session", "--dest=org.freedesktop.FileManager1", "--type=method_call",
                "/org/freedesktop/FileManager1", "org.freedesktop.FileManager1.ShowItems",
                format!("array:string:\"file://{path}\"").as_str(), "string:\"\""])
          .spawn()
          .unwrap();
    }
  }

  #[cfg(target_os = "macos")]
  {
    Command::new("open")
        .args(["-R", &path])
        .spawn()
        .unwrap();
  }
}
