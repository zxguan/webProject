// 引入axios
import axios from 'axios'
// 从element-plus引入了消息的组件
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import errorCode from '@/utils/errorCode'

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// axios全局配置，配置的是请求头的Content-Type,设置请求类型。全局配置会作用于发送的每一个请求
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// 创建axios实例，并把实例赋值给 service 这个变量
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '/api',
  // 超时
  timeout: 10000
})

// request拦截器（什么也没做）
service.interceptors.request.use(config => {
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 999) {
      ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // store.dispatch('LogOut').then(() => {
        //   location.href = '/index';
        // })
      })
    } else if (code === 500) {
      ElMessageBox({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      ElNotification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 默认导出 --- axios实例，可以用发请求，并且我们做的配置，会作用在请求上
export default service
