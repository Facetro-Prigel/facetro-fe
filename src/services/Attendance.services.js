import axios from 'axios';
import VueCookies from 'vue-cookies'
const BASE_URL = import.meta.env.VITE_BACKEND_API
const API_URL = BASE_URL+'log';
const config_u = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${VueCookies.get('token')}`
  }
}
export const fetchAttendanceLogs = async () => {
  try {
    const response = await axios.get(API_URL, config_u);
    return response.data;
  } catch (error) {
    console.error('Ada kesalahan saat mengambil data log kehadiran!', error);
    throw error;
  }
};

export const sendAttendanceData = async (data) => {
  try {
    await axios.post(API_URL,{},config_u);
  } catch (error) {
    console.error('Ada kesalahan saat mengirim data!', error);
    throw error;
  }
};