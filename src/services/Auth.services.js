import VueCookies from 'vue-cookies';
import apiClient from './Base.services';
export const login = async (data) => {
  try {
      const res= await apiClient.post('/user/login', data)
      await VueCookies.set('token', res.token, '14d')
      delete res.token;
      await VueCookies.set('user_data', res, '14d');
      return res;
    } catch (error) {
      console.error(error)
      throw error;
    }
}