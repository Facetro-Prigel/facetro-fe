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

export const downlaodAttendanceLogs = async (data) => {
  try {
    const response = await apiClient.get(`/log/recap?start_date=${data.start_date}&end_date=${data.end_date}`);

    const base64Data = response.file; // Pastikan ini sesuai dengan respons API sebenarnya
    const url = base64Data;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Laporan ${convertToLocale(new Date())}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Ada kesalahan saat mengunduh file!', error);
    throw error;
  }
};

export const updateAttendance = async (data) => {
  try {
    const response = await apiClient.put(API_URL + "/", data);

    return response;
  } catch (error) {
    console.error('Ada kesalahan saat mengupdate data kehadiran!', error);
    throw error;
  }
};

const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  })
}