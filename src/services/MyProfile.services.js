import axios from 'axios';
import VueCookies from 'vue-cookies'; 
const BASE_URL = import.meta.env.VITE_BACKEND_API

const API_URL = BASE_URL + 'myprofile/';

export const getUserProfile = async (uuid = "", token) => {
  try {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    // Jika uuid kosong, coba ambil dari data pengguna yang sudah login
    if (!uuid) {
      uuid = userData?.uuid || ""; // Ambil uuid dari user_data jika tersedia
    }
    const res = await axios.get(`${API_URL}${uuid}`, { // Sesuaikan endpoint profil sesuai API Anda
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`
      }
    });
    res.data.status = 'success';
    return res.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { status: 'fail', msg: 'Failed to fetch user data' };
  }
};


export const updateUser = async (uuid, userData) => {
  const token = localStorage.getItem('token') || VueCookies.get('token'); // Dapatkan token dari localStorage atau VueCookies

  try {
    const response = await axios.put(`${API_URL}${uuid}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    VueCookies.set("user_data", userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
    return { status: 'success', msg: 'Berhasil Update Data!' };
  } catch (error) {
    const message = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : 'Failed to update user data';
    console.error('Error updating user data:', message);
    return { status: 'fail', msg: message };
  }
};


// Fungsi untuk mengambil gambar UNNES berdasarkan nomor identitas
export const unnesImage = async (number, avatar=null) => {
    const token = VueCookies.get('token') || localStorage.getItem('token'); // Gunakan token dari VueCookies atau localStorage

    try {
      let res;
      if (avatar){
        res = await axios.get(`${BASE_URL}${avatar}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${token}`        
          }
        })
      }else{
        res = await axios.post(`${API_URL}unnes`, { identity_number: number }, {
            headers: {
                'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`
            }
        });
      }
      res.data.status = 'success';
      return res.data;
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : 'Failed to fetch UNNES image';
        console.error('Error fetching UNNES image:', message);
        return { status: 'fail', msg: message };
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