<template>
    <div>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }">
          <span class="progress-text">{{ progress }}%</span>
        </div>
      </div>
      <div class="progress-label">{{ label }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true,
        default: 0
      },
      label: {
        type: String,
        required: true,
        default: "Progress"
      }
    }
  }
  </script>
  
  <style scoped>
  .progress-bar-container {
    width: 100%;
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 25px;
    overflow: hidden;
    position: relative;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #5C14F5;
    transition: width 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }
  
  .progress-text {
    position: absolute;
    width: 100%;
    text-align: center;
    color: black;
  }
  
  .progress-label {
    text-align: center;
    margin-top: 10px;
    font-weight: 700;
    font-size: 16px;
    color: #333;
  }
  </style>
  