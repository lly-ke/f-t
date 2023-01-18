import { unregister, register } from '@tauri-apps/api/globalShortcut'
import { appWindow } from '@tauri-apps/api/window'
import { arch } from '@tauri-apps/api/os'

unregister('Command+W')
// await register('Command+W', async() => {
//   // TODO 会导致其他软件command+w快捷键失效
//   console.log(await arch());
//   appWindow.hide()

// })
