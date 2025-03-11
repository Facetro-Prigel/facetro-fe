import apiClient from "./Base.services";
const API_URL = 'group/';

export const fetchGroups = async () => {
  try {
    const res = await apiClient.get(API_URL);
    return res;
  } catch (error) {
    return error;
  }
};
export const fetchGroup = async (uuid) => {
  try {
    const res = await apiClient.get(API_URL+uuid);
    if(res.presence_group){
      res.presence_device = res.presence_group.map((i)=>{
        return i.device.uuid
      })
      delete res.presence_group
    }
    if(res.door_group){
      res.door_device = res.door_group.map((i)=>{
        return i.device.uuid
      })
      delete res.presence_group
    }
    res.users = res.users.uuid
    if(res.user_group){
      res.member = res.user_group.map((i)=>{
        return i.user
      })
      delete res.user_group
    }
    return res;
  } catch (error) {
    return error;
  }
};
export const createGroup = async (group) => {
  try {

    const res = await apiClient.post(API_URL, group);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateGroup = async (id, group) => {
  try {
    const res = await apiClient.put(`${API_URL}${id}`, group);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteGroup = async (id) => {
  try {
    const res = await apiClient.delete(`${API_URL}${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
