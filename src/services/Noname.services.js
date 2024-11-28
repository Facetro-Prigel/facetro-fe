import axios from 'axios'
import VueCookies from 'vue-cookies'
const BASE_URL = import.meta.env.VITE_BACKEND_API
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
      await VueCookies.set('user_data', res.data, '14d')
      return {status: true, msg: `Selemat Datang ${res.data.name}`, img: res.data.avatar}
  } catch (error) {
    return {status: false, msg: error.response.data.msg}
  }
}
