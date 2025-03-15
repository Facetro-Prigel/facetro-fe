import apiClient from './Base.services'; 

const API_URL = 'myprofile/';

export const getUserProfile = async () => {
  try {
    const res= await apiClient.get(API_URL)
    return res;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const birthdayImage = async () => {
  try {
    const res = await apiClient.get(`${API_URL}birthday`)
    return res;
  } catch (error) {
    console.error('Error fetching Birthday:', error);
  }
};

export const updateUser = async (userData) => {
  try {
    const res = await apiClient.put(API_URL, userData);
    return res
  } catch (error) {
    console.error(error)
    return error
  }
};


// Fungsi untuk mengambil gambar UNNES berdasarkan nomor identitas
export const unnesImage = async () => {
    try {
      const res= await apiClient.post(`${API_URL}unnes`)
      return res;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
};

export const changePassword = async (data) => {
  try {
    const res= await apiClient.post(`${API_URL}change_password`, data)
    return res;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


export const fileUpload = async (data) => {
  try {
    const res = await apiClient.post(API_URL+'image', {image:data})
    return res
  } catch (error) {
    return error
  }
};