import { WebviewWindow, WindowLabel, WindowOptions } from '@tauri-apps/api/window'

export function createWin(label: WindowLabel, options: WindowOptions) {
  return new WebviewWindow(label, options)
}
