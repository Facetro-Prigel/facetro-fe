
import apiClient from './Base.services';
const API_URL = 'user/';

export const fileUpload = async (data) => {
  try {
    const res = await apiClient.post(API_URL+'image', {image:data})
    return res
  } catch (error) {
    return error
  }
};
export const birthdayImage = async (uuid) => {
  try {
    const res = await apiClient.get(`${API_URL}birthday/${uuid}`)
    return res;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
export const unnesImage = async (number) => {
  try {
    const res = await apiClient.post(`${API_URL}unnes`, { identity_number: number })
    return res;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
export const fetchUser = async (uuid) => {
  try {
    const res = await apiClient.get(API_URL + uuid);
    let y = 0
    delete res.bbox
    res.identity_number = parseInt(res.identity_number)
    if (res.user_details) {
      if (res.user_details.birthday) {
        res.birthday = res.user_details.birthday.split('T')[0]
      }
      res.batch = res.user_details.batch
      res.phone_number = res.user_details.phone_number,
        res.program_study = res.user_details.program_study
      delete res.user_details
    }
    const tableRelated = ['group', 'role', 'permission']
    for (const element of ['user_group', 'role_user', 'permission_user']) {
      if (res[element]) {
        res[element] = await res[element].map(e => e[tableRelated[y]].uuid)
      }
      y++
    }
    return res;
  } catch (error) {
    console.error('Error get user data:', error);
  }
};
export const fetchUsers = async () => {
  try {
    const res = await apiClient.get(API_URL);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const createUser = async (user) => {
  try {
    const res = await apiClient.post(API_URL, user)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await apiClient.put(`${API_URL}${id}`, user)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await apiClient.delete(`${API_URL}${id}`)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
};
