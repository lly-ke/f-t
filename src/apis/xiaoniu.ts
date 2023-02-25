import request from '@utils/request'
import { readThirdConfigWithXiaoniu } from '@utils/fs'

export async function translateText(form: any) {
  const xiaoniuConfig = (await readThirdConfigWithXiaoniu())?.config
  const res = await request.post('https://api.niutrans.com/NiuTransServer/translation', {
    apikey: xiaoniuConfig?.apiKey,
    ...form,
  })
  return res.data
}
