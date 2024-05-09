import axios from 'axios'
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

