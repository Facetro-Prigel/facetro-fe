<template>
  <div>
    <div>
      <canvas ref="myChartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import Clock from './Clock.vue';

export default {
  components: {
    Clock
  },
  data() {
    return {
      canvasWidth: 1200,
      canvasHeight: 720
    };
  },
  mounted() {
    console.log('Component mounted');
    this.renderChart();
    this.setupResizeListener();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.myChartCanvas.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
          datasets: [{
            label: 'Attendance Tracker',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(126, 69, 247, 1)',
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    setupResizeListener() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    handleResize() {
      const zoom = window.devicePixelRatio;
      const canvas = this.$refs.myChartCanvas;
      canvas.style.width = `${this.canvasWidth / zoom}px`;
      canvas.style.height = `${this.canvasHeight / zoom}px`;
      canvas.width = this.canvasWidth * zoom;
      canvas.height = this.canvasHeight * zoom;
    }
  }
}
</script>

<style scoped>
canvas {
  width: 1500px;
  height: 720px;
}
</style>