import axios from 'axios';
import VueCookies from 'vue-cookies';
const BASE_URL = import.meta.env.VITE_BACKEND_API
const API_URL = BASE_URL + 'device/';
export const fetchDevices = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.data.status = 'success'
    return res.data.data;
  } catch (error) {
    error.response.status = 'error'
    error.response.msg= error.response.data.error
    return error.response;
  }
};

export const fetchDevice = async (id) => {
  try {
    const res = await axios.get(API_URL+id, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.data.status = 'success'
    res.data.data.location = res.data.data.locations
    delete res.data.data.locations
    return res.data.data;
  } catch (error) {
    error.response.status = 'error'
    error.response.msg= error.response.data.error
    return error.response;
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
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    error.response.status = 'error'
    error.response.msg= error.response.data.error
    return error.response;
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
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    error.response.status = 'error'
    error.response.msg= error.response.data.error
    return error.response;
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
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    error.response.status = 'error'
    error.response.msg= error.response.data.error
    return error.response;
  }
};
