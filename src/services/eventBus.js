// src/services/eventBus.js
import mitt from 'mitt';

// Membuat instance event bus menggunakan mitt
const eventBus = mitt();

export default eventBus;