import axios from 'axios';
import VueCookies from 'vue-cookies';
const BASE_URL = import.meta.env.VITE_BACKEND_API

const API_URL = BASE_URL + 'role/';

export const fetchRoles = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    res.data.status = 'fai'
    error.response.status = 'fail'
    error.response.msg= error.response.data.msg
    return error.response;
  }
};
export const fetchRole = async (uui) => {
  try {
    const res = await axios.get(API_URL+uui, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    delete res.data.data.uuid 
    if(res.data.data.permisionrole){
      res.data.data.permisions = await res.data.data.permisionrole.map(e => e.permission.uuid)
      delete res.data.data.permisionrole
    }
    console.info(res.data)
    return res.data;
  } catch (error) {
    console.error(error)
    return {status: 'fail', msg: 'Gagal mengambil data peran'};
  }
};
export const createRole = async (value) => {
  try {
    const res = await axios.post(API_URL, value, {
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


export const updateRole = async (id, permission) => {
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
    error.response.status = 'error'
    error.response.msg= error.response.data.msg
    return error.response;
  }
};

export const deleteRole = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status="success" 
    return res.data;
  } catch (error) {
    error.response.data.status="error"
    return error.response.data;
  }
};
