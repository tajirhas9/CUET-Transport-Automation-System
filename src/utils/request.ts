import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  headers: {
    'content-type': 'application/json'
  },
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers.authorization = UserModule.token
    }
    if (config.method !== 'get') {
      console.log(`[request] ${config.method} ${config.url}: ${JSON.stringify(config.data)}`)
    } else {
      console.log(`[request] ${config.method} ${config.url}`)
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 200: success
    // code == 403: invalid access token
    // code == 50002: already login in other place
    // code == 403: access token expired
    // code == 401: invalid user (user not exist)
    // code == 401: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (response.status !== 200 && response.status !== 201) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    if (!error.response.data.message) {
      console.error('Response message not found.')
    }
    if (error.response.status === 403 || error.response.status === 401) {
      console.log(`[response] ${error.response.config.method} ${error.response.config.url}: ${JSON.stringify(error.response.data)}`)
      MessageBox.confirm(
        'You have been logged out, you can cancel to stay on this page, or log in again',
        'Sure to log out',
        {
          confirmButtonText: 'Login again',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        UserModule.ResetToken()
        location.reload() // To prevent bugs from vue-router
      })
    } else if (error.response.status === 409) {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.response.data.message ? error.response.data.message : error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
