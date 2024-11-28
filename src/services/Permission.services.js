import axios from 'axios';
import VueCookies from 'vue-cookies';
const BASE_URL = import.meta.env.VITE_BACKEND_API

const API_URL = BASE_URL + 'permission/';

export const fetchPermissions = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.status = 'success'
    return res.data.data;
  } catch (error) {
    error.response.status = 'fail'
    error.response.msg= error.response.data.error
    return error.response;
  }
};
export const fetchPermission = async (uui) => {
  try {
    const res = await axios.get(API_URL+uui, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    return {status: 'fail', msg: 'Gagal mengambil data user'};
  }
};
export const createPermission = async (permission) => {
  try {
    const res = await axios.post(API_URL, permission, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    error.response.status = 'fail'
    error.response.msg= error.response.data.error
    return error.response;
  }
};

export const updatePermission = async (id, permission) => {
  try {
    const res = await axios.put(`${API_URL}${id}`, permission, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    error.response.status = 'fail'
    error.response.msg= error.response.data.error
    return error.response;
  }
};

export const deletePermission = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
