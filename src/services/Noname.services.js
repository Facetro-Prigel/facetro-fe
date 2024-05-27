import axios from 'axios'
import VueCookies from 'vue-cookies'

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
  console.log(data)
  try {
    const res = await axios
      .post(
        `https://103.23.100.110/user/login`,
        { email: data.email, password: data.password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      await VueCookies.set('token', res.data.token, '14d')
      return true
  } catch (error) {
    alert(error.response.data.msg)
    return false
  }
}
