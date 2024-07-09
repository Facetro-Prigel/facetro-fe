<template>
  <div
    class="w-[90%] flex m-8 p-2 rounded-[30px] justify-center border-4 border-black/5  border-t-black/10 border-x-black/15">
    <div
      class="w-[100%] flex p-1 rounded-[30px] justify-center border-4 animate-[pingb_2s_ease-in-out_infinite] border-black/10  border-t-black/50 ">
      <div class="relative w-[100%] rounded-[30px] overflow-hidden m-2">
        <video ref="image" class="camera-video z-10" autoplay playsinline></video>
        <div
          class="absolute w-full block left-0 animate-[updown_2s_ease-in-out_infinite] h-[5px] z-30 bg-gradient-to-r  from-yellow-500/50 via-indigo-100 to-yellow-500/50">
        </div>
        <canvas ref="tempImg" class="hidden"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Peer from 'peerjs';


const emit = defineEmits(['imageFrame']);
const image = ref(null);
const tempImg = ref(null);
const peer = ref(null);

onMounted(() => {
  const hash = location.hash;
  const id = hash.split('#')[1];
  console.log(id);

  peer.value = new Peer(id, {
    host: '/',
    port: '3002',
  });

  var streamSettings;
  const constraints = (window.constraints = {
    audio: false,
    video: true
  });
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      image.value.srcObject = stream;
      streamSettings = stream.getVideoTracks()[0].getSettings();
      tempImg.value.width = streamSettings.width;
      tempImg.value.height = streamSettings.height;

      // Call the admin
      var call = peer.value.call("21", stream);
      call.on('stream', function(remoteStream) {});

    })
    .catch(error => {
      console.error(error);
    });
});

const emitImage = () =>{
  tempImg.value.getContext('2d').drawImage(image.value, 0, 0, tempImg.value.width, tempImg.value.height);
  let data = tempImg.value.toDataURL('image/jpeg');
  emit("imageFrame", data)
}
defineExpose({emitImage})
</script>