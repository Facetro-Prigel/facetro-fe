import apiClient from "./Base.services";

const API_URL = 'log';

const convertToLocale = (time) => {
  return time.toLocaleString('id-ID', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'long',
    dateStyle: 'medium'
  }).replace(',','')
}
export const fetchAttendanceLogs = async (data) => {
  try {
    const response = apiClient.get(API_URL, { params: data });
    return response;
  } catch (error) {
    console.error('Ada kesalahan saat mengambil data log kehadiran!', error);
    throw error;
  }
};

export const downlaodAttendanceLogs = async (data) => {
  try {
    const response = await apiClient.get(API_URL+"/recap"); 
    const base64Data = response.file;
    console.log(base64Data)
    const url = base64Data;
    // Membuat elemen <a> untuk memicu unduhan
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Laporan ${convertToLocale(new Date())}.xlsx`); // Nama file dinamis
    document.body.appendChild(link);
    // Memicu klik pada elemen <a> untuk memulai unduhan
    link.click();
    // Membersihkan elemen <a> dan revoke object URL
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Ada kesalahan saat mengunduh file!', error);
    throw error;
  }
};