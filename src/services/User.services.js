import axios from 'axios';
import VueCookies from 'vue-cookies';
const BASE_URL = import.meta.env.VITE_BACKEND_API

const API_URL = BASE_URL + 'user/';

export const fileUpload = async (data) => {
  try {
    const res = await axios.post(API_URL+'image', {image:data},{
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    return {status: 'fail', msg: error.response.data.msg};
  }
};

export const unnesImage = async (number) => {
  try {
    const res = await axios.post(API_URL+'unnes', {identity_number:number},{
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    return res.data;
  } catch (error) {
    return {status: 'fail', msg: error.response.data.msg};
  }
};
export const fetchUser = async (uui) => {
  try {
    const res = await axios.get(API_URL+uui, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.data.status = 'success'
    let y = 0
    delete res.data.data.uuid 
    delete res.data.data.bbox
    res.data.data.identityNumber = parseInt(res.data.data.identityNumber)
    if(res.data.data.birtday){
      res.data.data.birthday = res.data.data.birtday.split('T')[0]
    }
    const tableRelated = ['group', 'role','permission']
    const inputField = ['usergroup', 'role','permission']
    for (const element of ['usergroup', 'roleuser','permissionUser']) {
      if(res.data.data[element]){
        res.data.data[inputField[y]] = await res.data.data[element].map(e => e[tableRelated[y]].uuid)
        if(element != inputField[y]){
          delete res.data.data[element]
        }
      }
      y++
    }
    return res.data;
  } catch (error) {
    return {status: 'fail', msg: 'Gagal mengambil data user'};
  }
};
export const fetchUsers = async () => {
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

export const createUser = async (user) => {
  try {
    const res = await axios.post(API_URL, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    return {status: 'success', msg: "Pengguna Berhasil ditambahkan"};
  } catch (error) {
    const response = error.response.data
    response.status= 'fail'
    return response;
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await axios.put(`${API_URL}${id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    return {status: 'success', msg: "Pengguna berhasil diubah"};
  } catch (error) {
    const response = error.response.data
    response.status= 'fail'
    return response;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      }
    });
    res.status = 'success'
    return res.data;
  } catch (error) {
    error.response.status = 'fail'
    return error.response;
  }
};
