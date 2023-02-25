import { readTextFile, writeTextFile, BaseDirectory, exists, createDir } from '@tauri-apps/api/fs'
import { message } from 'ant-design-vue'
import { getVersion } from '@tauri-apps/api/app'

const thirdConfigPath = 'app.json'
const version = await getVersion()

export async function readThirdConfigWithYoudao() {
  const configList = await readThirdConfig()
  if (configList) {
    return configList.find((i: any) => i.key === 'youdao') || {}
  }
  return {}
}

export async function readThirdConfigWithXiaoniu() {
  const configList = await readThirdConfig()
  if (configList) {
    return configList.find((i: any) => i.key === 'xiaoniu') || {}
  }
  return {}
}

export async function readThirdConfig() {
  const config = await readConfig()
  return config?.config?.third || []
}

export async function writeThirdConfig(config: any) {
  writeConfig({ version, config: { third: config } })
}

async function readConfig() {
  try {
    if (await exists(thirdConfigPath, { dir: BaseDirectory.AppConfig })) {
      const configJsonStr = await readTextFile(thirdConfigPath, { dir: BaseDirectory.AppConfig })
      return JSON.parse(configJsonStr)
    } else {
      await createDir('', { dir: BaseDirectory.AppData, recursive: true })
    }
  } catch (e) {
    console.log(e, '读取配置异常')
    message.error(`读取配置异常, 发生错误: ${e}`)
  }
}

async function writeConfig(config: any) {
  try {
    await writeTextFile(thirdConfigPath, JSON.stringify(config, null, 2), { dir: BaseDirectory.AppConfig })
    console.log('写入配置成功', config)

    message.success('保存配置成功')
  } catch (e) {
    console.log(e, '写入配置异常')
    message.error(`写入配置异常, 发生错误: ${e}`)
  }
}
