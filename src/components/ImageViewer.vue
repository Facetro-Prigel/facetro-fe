<template>
    <div ref="imageView" class="overflow-hidden rounded-xl m-2 relative drop-shadow-md max-w-[400px] transition-all duration-300 hover:scale-110">
        <img v-if="isImage" :src="image" alt="Image" class="w-full" ref="imageElem" @load="makeBoundingBox(boundingBox, imageElem, bbox)"/>
        <video v-if="isVideo" autoplay playsinline loop muted :src="image"></video>
        <div v-if="isImage" ref="boundingBox" class="absolute border-4 top-0 rounded-2xl block animate-pulse translate-all duration-300 bg-gradient-to-br  from-white/40 via-white/30 to-white/60"
            :class="{ 'border-green-500': isSuccess, 'border-red-500': !isSuccess }"> </div>
        <video v-if="!isImage && !isVideo" autoplay playsinline loop muted :src="no_record_vid"></video>
    </div>
</template>

<script setup>
import { computed, watch, ref, onMounted} from 'vue'
import no_record_vid from '@/assets/videos/no_record.mp4'
const props = defineProps(
    {
        image: {
            type: String,
            required: true
        },
        isSuccess:{
            type: Boolean,
            reqired: true
        },
        bbox:{
            type: Array,
        }
    }
)
const boundingBox = ref();
const imageElem = ref();
const imageView = ref();


const isImage = computed(() => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(props.image)
})

const isVideo = computed(() => {
    return /\.(mp4|webm|ogg)$/i.test(props.image)
})

const makeBoundingBox = (boundingbox, image, data = [0, 0, 0]) => {
    let factor = image.width / image.naturalWidth;
    let xOffset = (imageView.value.clientWidth - image.width) / 2;
    let yOffset = (imageView.value.clientHeight - image.height) / 2;
    let size = factor * data[2];
    boundingbox.style.width = String(parseInt(size)) + 'px'
    boundingbox.style.height = String(parseInt(size)) + 'px';
    boundingbox.style.top = String(yOffset + (data[1] * factor)) + 'px';
    boundingbox.style.left = String(xOffset + (data[0] * factor)) + 'px';
}
</script>