import { defineStore } from 'pinia';

export const useStreamStore = defineStore('stream', {
  state: () => ({
    streams: []
  }),
  actions: {
    setStream(index, stream) {
      this.streams[index] = stream;
    },
    saveStream({ index, stream }) {
      this.setStream(index, stream);
    }
  }
});
