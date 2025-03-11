import apiClient from './Base.services';

export default {
  async login() {
    try {
      const response = await apiClient.get('/usser');
      return response;
    } catch (error) {
      throw error;
    }
  },
};