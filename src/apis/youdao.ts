import request from '@utils/request'
import { readThirdConfigWithYoudao } from '@utils/fs'
import axios from 'axios'
import { sha256, uuidv4 } from '../utils/math'

export async function translateText(form: any) {
  const youdaoConfig = (await readThirdConfigWithYoudao())?.config
  

  const appKey = youdaoConfig.appKey
  const secretKey = youdaoConfig.secretKey

  const curtime = Math.round(new Date().getTime() / 1000)
  const salt = uuidv4()
  // sign=sha256(应用ID+input+salt+curtime+应用密钥)；
  const sign = await sha256(appKey + truncate(form.q) + salt + curtime + secretKey)
  Object.assign(form, {
    appKey,
    salt,
    sign,
    curtime,
    signType: 'v3',
  })

  const res = await jsonp('https://openapi.youdao.com/api', form)
  return res
}

function jsonp(url: any, data: any) {
  if (!url) throw new Error('url is necessary')
  const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
  const JSONP = document.createElement('script')
  JSONP.setAttribute('type', 'text/javascript')

  const headEle = document.getElementsByTagName('head')[0]

  let ret = ''
  if (data) {
    if (typeof data === 'string') ret = '&' + data
    else if (typeof data === 'object') {
      for (const key in data) ret += '&' + key + '=' + encodeURIComponent(data[key])
    }
    ret += '&_time=' + Date.now()
  }
  JSONP.src = `${url}?callback=${callback}${ret}`
  return new Promise((resolve, reject) => {
    window[callback] = (r) => {
      resolve(r)
      headEle.removeChild(JSONP)
      delete window[callback]
    }
    headEle.appendChild(JSONP)
  })
}

function truncate(q: string) {
  const len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}

function objToFormData(obj: any) {
  const formData = new FormData()
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key])
  })
  return formData
}
