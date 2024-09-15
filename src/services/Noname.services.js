import axios from 'axios'
import VueCookies from 'vue-cookies'
import BASE_URL from '@/stores/config';

// using in .env make VITE_VUE_APP_BASE_URL

export const anotherfunction = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_BASE_URL}`, {
      headers: {
        'Cache-Control': 'no-cache' // Mengatur header Cache-Control untuk memastikan data selalu diambil dari server
      }
    })
    return res.data.data
  } catch (error) {
    return error.message
  }
}

export const login = async (data) => {
  try {
    const res = await axios
      .post(
        `${BASE_URL}user/login`,
        { 
          email: data.email, 
          password: data.password 
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      await VueCookies.set('token', res.data.token, '14d')
      delete res.data.token;
      await VueCookies.set('user', res.data, '14d')
      return {status: true, msg: `Selemat Datang ${res.data.name}`, img: res.data.avatar}
  } catch (error) {
    return {status: false, msg: error.response.data.msg}
  }
}
