import apiClient from './Base.services';

export default {
  async login() {
    try {
      const response = await apiClient.get('/usser');
      console.log(response)
      return response;
    } catch (error) {
      throw error;
    }
  },
};