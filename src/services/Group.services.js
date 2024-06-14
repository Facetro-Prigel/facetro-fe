import axios from 'axios';
import VueCookies from 'vue-cookies';
import BASE_URL from '@/stores/config';

const API_URL = BASE_URL + 'group/';

export const fetchGroup = async () => {
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

export const createGroup = async (group) => {
  try {
    const res = await axios.post(API_URL, group, {
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

export const updateGroup = async (id, group) => {
  try {
    const res = await axios.put(`${API_URL}${id}`, group, {
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
