<template>
  <div class="text-gray-400 text-center flex items-center justify-center">
    <div
      class="clock-container flex flex-col justify-center items-center rounded-md shadow-2xl mt-4 px-4 py-4"
      ref="clockContainer">
      <div class="svg-icon mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="128"
          height="128"
          viewBox="0 0 80 80">
          <path
            fill="#8bb7f0"
            d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z"
          ></path>
          <path
            fill="#4e7ab5"
            d="M40,3c20.4,0,37,16.6,37,37S60.4,77,40,77S3,60.4,3,40S19.6,3,40,3 M40,2C19,2,2,19,2,40 s17,38,38,38s38-17,38-38S61,2,40,2L40,2z"
          ></path>
          <path
            fill="#fff"
            d="M40,71.5C22.6,71.5,8.5,57.4,8.5,40S22.6,8.5,40,8.5S71.5,22.6,71.5,40S57.4,71.5,40,71.5z"
          ></path>
          <path
            fill="#4e7ab5"
            d="M40,9c17.1,0,31,13.9,31,31S57.1,71,40,71S9,57.1,9,40S22.9,9,40,9 M40,8C22.3,8,8,22.3,8,40 s14.3,32,32,32s32-14.3,32-32S57.7,8,40,8L40,8z"
          ></path>
          <path
            fill="#66798f"
            d="M48.7,54.7c-0.3,0-0.7-0.2-0.8-0.5l-9-14.2l12.3-21.2c0.3-0.5,0.9-0.6,1.4-0.4 c0.5,0.3,0.6,0.9,0.4,1.4L41.2,40l8.4,13.2c0.3,0.5,0.2,1.1-0.3,1.4C49.1,54.6,48.9,54.7,48.7,54.7z"
          ></path>
          <path fill="#66798f" d="M40 37A3 3 0 1 0 40 43A3 3 0 1 0 40 37Z"></path>
          <path fill="#c5d4de" d="M40 11A2 2 0 1 0 40 15A2 2 0 1 0 40 11Z"></path>
          <path
            fill="#c5d4de"
            d="M26.5 15.600000000000001A1 1 0 1 0 26.5 17.6A1 1 0 1 0 26.5 15.600000000000001Z"
            transform="rotate(-30 26.499 16.618)"
          ></path>
          <path fill="#c5d4de" d="M40 65A2 2 0 1 0 40 69A2 2 0 1 0 40 65Z"></path>
          <path
            fill="#c5d4de"
            d="M53.5 62.4A1 1 0 1 0 53.5 64.4A1 1 0 1 0 53.5 62.4Z"
            transform="rotate(-30 53.497 63.384)"
          ></path>
          <path
            fill="#c5d4de"
            d="M53.5 15.600000000000001A1 1 0 1 0 53.5 17.6A1 1 0 1 0 53.5 15.600000000000001Z"
            transform="rotate(-60 53.5 16.62)"
          ></path>
          <path
            fill="#c5d4de"
            d="M26.5 62.4A1 1 0 1 0 26.5 64.4A1 1 0 1 0 26.5 62.4Z"
            transform="rotate(-60 26.498 63.385)"
          ></path>
          <path
            fill="#c5d4de"
            d="M16.6 52.5A1 1 0 1 0 16.6 54.5A1 1 0 1 0 16.6 52.5Z"
            transform="rotate(-30 16.615 53.5)"
          ></path>
          <path
            fill="#c5d4de"
            d="M63.4 25.5A1 1 0 1 0 63.4 27.5A1 1 0 1 0 63.4 25.5Z"
            transform="rotate(-30 63.381 26.502)"
          ></path>
          <path
            fill="#c5d4de"
            d="M16.6 25.5A1 1 0 1 0 16.6 27.5A1 1 0 1 0 16.6 25.5Z"
            transform="rotate(-60 16.616 26.501)"
          ></path>
          <path
            fill="#c5d4de"
            d="M63.4 52.5A1 1 0 1 0 63.4 54.5A1 1 0 1 0 63.4 52.5Z"
            transform="rotate(-60 63.381 53.503)"
          ></path>
          <g><path fill="#c5d4de" d="M67 38A2 2 0 1 0 67 42A2 2 0 1 0 67 38Z"></path></g>
          <g><path fill="#c5d4de" d="M13 38A2 2 0 1 0 13 42A2 2 0 1 0 13 38Z"></path></g>
        </svg>
      </div>
      <div class="flex items-center">
        <div>
          <p class="time text-6xl font-bold mb-2">{{ time }}</p>
          <p class="date text-black text-xl mb-2">{{ today }}</p>
          <p class="date text-black text-xl">{{ date }}</p>
          <p class="weather text-yellow-500 text-xl mt-4">{{ weather }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      today: '',
      date: '',
      weather: 'Sunny',
      containerWidth: 600, // Lebar kotak
      containerHeight: 615 // Tinggi kotak
    }
  },
  mounted() {
    this.setupResizeListener();
    this.updateTime();
    this.timerID = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timerID);
  },
  methods: {
    setupResizeListener() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    handleResize() {
      const zoom = window.devicePixelRatio;
      const container = this.$refs.clockContainer;
      container.style.width = `${this.containerWidth / zoom}px`;
      container.style.height = `${this.containerHeight}px`; // Tinggi tetap
    },
    updateTime() {
      const cd = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.today = 'Today: ';
      this.date = cd.getDate() + ' ' + monthNames[cd.getMonth()] + ' ' + cd.getFullYear();
    },
    zeroPadding(num, digit) {
      let zero = '';
      for (let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  }
}
</script>

<style scoped>
.clock-container {
  width: 600px; /* Lebar kotak */
  height: 615px; /* Tinggi kotak */
  max-width: 100%; /* Maksimum lebar */
  background-color: #FFFFFF; /* Ganti dengan warna latar belakang yang diinginkan */
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5); /* Efek bayangan */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: width 0.2s ease; /* Animasi perubahan lebar */
  overflow: hidden;
}
</style>
