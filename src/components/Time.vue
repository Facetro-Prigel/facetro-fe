<template>
    <div class="flex rounded-lg justify-center items-center bg-gray-700 text-black border-4 border-black bg-opacity-20 text-lg p-2">
        <div class="px-2 py-2 border-gray-800/30 border-r-4 text-2xl font-bold">
                {{ clock }}
        </div>
        <div class="flex flex-col justify-center text-md text-left">
            <div class="px-4 font-bold">{{ day }},</div>
            <div class="px-4">{{ date }}</div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Time',
    data() {
    return {
      interval: null,
      clock: null,
      date: null,
      day: null
    }
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      let time = Intl.DateTimeFormat('id-ID', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format()
      this.day = Intl.DateTimeFormat('id-ID', {
        weekday: 'long'
      }).format()
      
      this.date = Intl.DateTimeFormat('id-ID', {
        day:'numeric',
        month: 'long',
        year: 'numeric'
      }).format()
      this.clock = time.replaceAll(".", ":")

    }, 1000)
  }
}
</script>