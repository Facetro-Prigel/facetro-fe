import axios from 'axios';
import VueCookies from 'vue-cookies';
const BASE_URL = import.meta.env.VITE_BACKEND_API

const API_URL = BASE_URL + 'group/';

export const fetchGroups = async () => {
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
    return error.message;
  }
};
export const fetchGroup = async (uuid) => {
  try {
    const res = await axios.get(API_URL+uuid, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    if(res.data.data.device){
      res.data.data.device = res.data.data.device.uuid
    }
    if(res.data.data.users){
      res.data.data.notifyTo = res.data.data.users.uuid
      delete res.data.data.users
    }
    if(res.data.data.locations){
      res.data.data.location = res.data.data.locations
      delete res.data.data.locations
    }
    if(res.data.data.usergroup){
      res.data.data.member = res.data.data.usergroup.map((i)=>{
        return i.user
      })
      delete res.data.usergroup
    }
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const createGroup = async (group) => {
  try {
    console.log('Sending data to server:', group);
    const res = await axios.post(API_URL, group, {
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

export const updateGroup = async (id, group) => {
  try {
    const res = await axios.put(`${API_URL}${id}`, group, {
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

export const deleteGroup = async (id) => {
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
