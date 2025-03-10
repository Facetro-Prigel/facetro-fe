import axios from 'axios';
import VueCookies from 'vue-cookies';
import apiClient from './Base.services'; 

const API_URL = 'myprofile/';

export const getUserProfile = async (token) => {
  try {
    const res= await apiClient.get(API_URL)
    // VueCookies.set("user_data", res);
    return res;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


export const updateUser = async (userData) => {
  try {
    await apiClient.put(API_URL, userData);
  } catch (error) {
    console.error(error)
    return error
  }
};


// Fungsi untuk mengambil gambar UNNES berdasarkan nomor identitas
export const unnesImage = async (number) => {
   
    try {
      const res= await apiClient.post(`${API_URL}unnes`, { identity_number: number })
      return res;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
};


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