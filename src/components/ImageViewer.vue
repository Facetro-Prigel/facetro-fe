<template>
    <div class="overflow-hidden rounded-xl m-2 relative drop-shadow-md max-w-[400px] transition-all duration-300 hover:scale-110"
        ref="imageView">
        <video v-if="image && image.search('.mp4') > 4" autoplay playsinline loop ref="img" type="video/mp4"></video>
        <img v-if="image && image.search('.mp4') < 2" class="w-full" :alt="type" ref="img">
        <div class="absolute border-4 top-0 rounded-2xl block animate-pulse translate-all duration-300 bg-gradient-to-br  from-white/40 via-white/30 to-white/60" ref="boundingBox"
            :class="{ 'border-green-500': isSuccess, 'border-red-500': !isSuccess }"> </div>
    </div>
</template>

<script setup>
import { ref, effect } from 'vue';
const props = defineProps({'bbox': Array, 'isSuccess': Boolean, 'type':String, 'image':String});
const img = ref();
const imageView = ref();
const boundingBox = ref();


const makeBoundingBox = (boundingbox, image, data = [0,0,0]) => {
    if(image){
        let factor =  image.width/image.naturalWidth;
        let xOffset = (imageView.value.clientWidth - image.width) / 2;
        let yOffset = (imageView.value.clientHeight - image.height) / 2;
        let size = factor * data[2];
        boundingbox.style.width = String(parseInt(size)) + 'px'
        boundingbox.style.height =  String(parseInt(size)) + 'px';
        boundingbox.style.top= String(yOffset + (data[1]*factor)) + 'px';
        boundingbox.style.left = String(xOffset + (data[0]*factor)) + 'px';
    }
}

effect(() => {
    if(img.value){
        img.value.src = props.image;
    }
    if(imageView.value && (!props.isSuccess)){
        makeBoundingBox(boundingBox.value, img.value)
    }
    if (imageView.value && props.bbox) {
        setTimeout(() => {
            makeBoundingBox(boundingBox.value, img.value, props.bbox)
        }, 400);
    }

})
</script>