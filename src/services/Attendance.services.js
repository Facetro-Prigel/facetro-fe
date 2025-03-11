import apiClient from "./Base.services";
const API_URL ='log';

export const fetchAttendanceLogs = async (data) => {
  try {
    const response = apiClient.get(API_URL, {params:data});
    return response;
  } catch (error) {
    console.error('Ada kesalahan saat mengambil data log kehadiran!', error);
    throw error;
  }
};