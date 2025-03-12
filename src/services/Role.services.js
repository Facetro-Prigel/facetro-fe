import apiClient from './Base.services';
const API_URL = 'role/';

export const fetchRoles = async () => {
  try {
    const res = await apiClient.get(API_URL)
    console.log(res)
    return res;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return error
  }
};
export const fetchRole = async (uuid) => {
  try {
    const res = await apiClient.get(API_URL+uuid);
    delete res.uuid 
    res.permission_role = res.permission_role.map(per =>{return per.permission.uuid})
    return res;
  } catch (error) {
    console.error('Error fetching role:', error);
    return error
  }
};
export const createRole = async (value) => {
  try {
    const res = apiClient.post(API_URL, value);
    return res;
  } catch (error) {
    console.error('Error creating role:', error);
    return error;
  }
};


export const updateRole = async (id, permission) => {
  try {
    const res = await apiClient.put(API_URL+id, permission);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteRole = async (id) => {
  try {
    const res = await apiClient.delete(API_URL+id);
    return res.data;
  } catch (error) {
    return error;
  }
};
