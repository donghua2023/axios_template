
let BASE_URL = ''
let TIME_OUT = 10000
if(import.meta.env.DEV) {
  BASE_URL = "http://111.230.245.205:8880"
} else if(import.meta.env.PROD) {
  BASE_URL = "http://baidu.com"
} else {
  BASE_URL = "http://baidu.com"
}

export { BASE_URL, TIME_OUT}
