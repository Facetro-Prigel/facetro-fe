import VueCookies from 'vue-cookies'
import axios from 'axios'
import eventBus from './eventBus';
import router from '@/router'; // Import Vue Router
const BASE_URL = import.meta.env.VITE_BACKEND_API;

// Konfigurasi Axios
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Interceptor untuk menambahkan Bearer Token ke setiap request
apiClient.interceptors.request.use((config) => {
    const authStore = VueCookies.get('token');
    if (authStore) {
        config.headers.Authorization = `Bearer ${authStore}`;
    }

    // Kirim toast loading sebelum request dikirim
    const loadingToast = {
        severity: 'warn', // Gunakan warn untuk loading
        summary: 'Loading',
        detail: 'Sedang memproses permintaan...',
        life: 0, // Durasi toast tidak terbatas (hingga dihapus secara manual)
    };
    eventBus.emit('api-loading', loadingToast);

    return config;
});

// Interceptor untuk handle response
apiClient.interceptors.response.use(
    (response) => {
        const data = response.data;
        eventBus.emit('api-loading-clear');
        const toastData = {
            severity: 'success',
            summary: data.title,
            detail: data.detail,
        };
        eventBus.emit('api-error', toastData);
        // Handle success berdasarkan HTTP status code
        if (response.status >= 200 && response.status < 300) {
            if (data.data) {
                let out = data.data;
                if (Array.isArray(out) && out.length == 1) {
                    out = out[0];
                }
                return Promise.resolve(out);
            }
            return Promise.resolve(response.data);
        }
        return Promise.reject(response.data);
    },
    (error) => {
        eventBus.emit('api-loading-clear');
        if (error.response) {
            const { status, data } = error.response;
            const toastData = {
                severity: 'error',
                summary: data.title || 'Error ' + status,
                detail: data.detail || 'Terjadi kesalahan!',
            };

            // Kirim pesan error melalui event bus
            eventBus.emit('api-error', toastData);

            // Redirect berdasarkan status code
            if (status === 400) {
                return Promise.reject({ title: 'Bad Request', detail: data.detail || 'Akses tidak sah!', validateError: data.data[0] });
            }
            if (status === 401) {
                VueCookies.remove('token');
                VueCookies.remove('user_data'); // Hapus token dari store
                router.push({ name: 'login' }); // Redirect ke halaman login
                return Promise.reject({ title: 'Unauthorized', detail: data.detail || 'Akses tidak sah!' });
            }

            if (status === 403) {
                return Promise.reject({ title: 'Forbidden', detail: data.detail || 'Anda tidak memiliki izin!' });
            }

            if (status === 404) {
                return Promise.reject({ title: 'Not Found', detail: data.detail || 'Resource tidak ditemukan!' });
            }

            if (status >= 500) {
                return Promise.reject({ title: 'Server Error', detail: data.detail || 'Terjadi kesalahan server!' });
            }

            return Promise.reject({ title: 'Error', detail: data.detail || 'Terjadi kesalahan!' });
        }

        // Jika tidak ada response (misalnya timeout atau jaringan down)
        return Promise.reject({ title: 'Error', detail: 'Tidak dapat terhubung ke server' });
    }
);

export default apiClient;