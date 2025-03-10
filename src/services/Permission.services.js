import apiClient from './Base.services';
import VueCookies from 'vue-cookies';

const API_URL = 'permission/';

export const fetchPermissions = async () => {
  try {
    const res = await apiClient.get(API_URL)
    return res;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return error
  }
};
export const fetchPermission = async (uuid) => {
  try {
    const res = await apiClient.get(API_URL + uuid)
    return res;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return error
  }
};
export const createPermission = async (permission) => {
  try {
    const res = await apiClient.post(API_URL, permission);
    return res;
  } catch (error) {
    console.error(error)
    return error;
  }
};

export const updatePermission = async (id, permission) => {
  try {
    const res = await apiClient.put(`${API_URL}${id}`, permission);
    return res.data;
  } catch (error) {
    console.error(error)
    return error;
  }
};

export const deletePermission = async (id) => {
  try {
    const res = await apiClient.delete(`${API_URL}${id}`)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
};
