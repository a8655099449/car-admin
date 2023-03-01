
import CryptoJS from 'crypto-js'


export function wait(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


export const md5 = (s) =>  CryptoJS.MD5(s).toString()