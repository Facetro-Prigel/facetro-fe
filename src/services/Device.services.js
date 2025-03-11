import apiClient from "./Base.services";
const API_URL = 'device/';
export const fetchDevices = async () => {
  try {
    const res = await apiClient.get(API_URL);
    return res;
  } catch (error) {
    return error;
  }
};

export const fetchDevice = async (uuid) => {
  try {
    const res = await apiClient.get(API_URL+uuid);
    return res;
  } catch (error) {
    return error;
  }
};

export const createDevice = async (device) => {
  try {
    const res = await apiClient.post(API_URL, device);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateDevice = async (uuid, device) => {
  try {
    const res = await apiClient.put(`${API_URL}${uuid}`, device);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteDevice = async (id) => {
  try {
    const res = await apiClient.delete(`${API_URL}${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
