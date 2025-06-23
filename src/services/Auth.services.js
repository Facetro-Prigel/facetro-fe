import VueCookies from 'vue-cookies';
import apiClient from './Base.services';

export const login = async (data) => {
  try {
    const res = await apiClient.post('/user/login', data)
    await VueCookies.set('token', res.token, '14d')
    delete res.token;
    try {
      localStorage.removeItem('user_data');
    } catch (error) {
      console.error("Error while removing user_data")
    }
    let s = JSON.stringify(res)
    localStorage.setItem('user_data', s);
    return res;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export const loginWithGoogle = async (data) => {
  try {

    const res = await apiClient.post('/user/google-login', data);

    if (res.token) {
      await VueCookies.set('token', res.token, '14d');
      delete res.token;
      try {
        localStorage.removeItem('user_data');
      } catch (error) {
        console.error("Error while removing user_data:", error);
      }
      let s = JSON.stringify(res);
      localStorage.setItem('user_data', s);
    } else {
      console.error('No token received from backend');
      throw new Error('No authentication token received');
    }
    return res;
  } catch (error) {
    console.error('Error in loginWithGoogle:', {
      error: error,
      response: error.response,
      data: error.response?.data
    });
    throw error;
  }
}