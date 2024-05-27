<template>
  <div class="flex items-center justify-center">
    <div>
      <div>
        <div class="flex">
          <div
            class="flex-row items-center justify-center w-[310px] h-[300px] rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.5)] mt-4 mr-4 px-8 pt-4"
          >
            <div class="flex gap-4 items-center justify-between">
              <div>
                <h5 class="text-[16px]">Total Employee</h5>
                <h2 class="text-[40px] font-bold">64</h2>
              </div>
              <div class="pi pi-users" style="font-size: 1.5rem"></div>
            </div>
            <ProgressBar class="mt-20" :progress="60" :label="'Attendance'" />
          </div>
          <div
            class="flex items-center justify-center gap-4 w-[310px] h-[300px] rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.5)] mt-4 px-4 py-4"
          >
            <div>
              <h5 class="text-[16px]">On Time</h5>
              <h2 class="text-[40px] font-bold">32</h2>
            </div>
            <div class="flex justify-between gap-3">
              <circle-progress
                :percent="40"
                :size="140"
                :is-gradient="true"
                :show-percent="true"
                :gradient="{
                  angle: 90,
                  startColor: '#5c14f5',
                  stopColor: '#5c14f5'
                }"
              />
              <div class="pi pi-clock" style="font-size: 1.5rem"></div>
            </div>
          </div>
        </div>

        <div class="flex">
          <div
            class="flex-row items-center justify-center w-[310px] h-[300px] rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.5)] mt-4 mr-4 px-8 pt-4"
          >
            <div class="flex gap-4 items-center justify-between">
              <div>
                <h5 class="text-[16px]">Late Arrival</h5>
                <h2 class="text-[40px] font-bold">12</h2>
              </div>
              <div class="pi pi-stopwatch" style="font-size: 1.5rem"></div>
            </div>
            <ProgressBar class="mt-20" :progress="20" :label="'Late Arrival'" />
          </div>
          <div
            class="flex-row items-center justify-center w-[310px] h-[300px] rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.5)] mt-4 mr-4 px-8 pt-4"
          >
            <div class="flex gap-4 items-center justify-between">
              <div>
                <h5 class="text-[16px]">Absent</h5>
                <h2 class="text-[40px] font-bold">32</h2>
              </div>
              <div class="pi pi-calendar-times" style="font-size: 1.5rem"></div>
            </div>
            <ProgressBar class="mt-20" :progress="50" :label="'Absent'" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <Clock />
    </div>
  </div>
  <keep-alive>
    <Chart class="flex justify-center mt-4" />
  </keep-alive>
</template>

<script>
import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'
import Chart from '../components/Chart.vue'
import ProgressBar from '../components/ProgressBar.vue'
import Clock from '../components/Clock.vue'

export default {
  components: {
    CircleProgress,
    Chart,
    ProgressBar,
    Clock
  }
}
</script>

<style scoped></style>
