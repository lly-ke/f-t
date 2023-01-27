import { invoke } from '@tauri-apps/api/tauri'
import { WebviewWindow, WindowLabel, WindowOptions } from '@tauri-apps/api/window'

export function createWin(label: WindowLabel, options: WindowOptions) {
  // options = {
  //   transparent: true,
  //   ...options,
  // }
  const webview = new WebviewWindow(label, options)
  if (options.transparent == true) {
    webview.once('tauri://created', () => {
      invoke('set_window_vibrancy_backend', {
        label,
      })
    })
  }
  return webview
}
