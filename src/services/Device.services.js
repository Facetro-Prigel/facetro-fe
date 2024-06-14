import axios from 'axios';
import VueCookies from 'vue-cookies';
import BASE_URL from '@/stores/config';

const API_URL = BASE_URL + 'device/';

export const fetchDevice = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    return res.data.data;
  } catch (error) {
    return error.message;
  }
};

export const createDevice = async (device) => {
  try {
    const res = await axios.post(API_URL, device, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const updateDevice = async (id, device) => {
  try {
    const res = await axios.put(`${API_URL}${id}`, device, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteDevice = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};
