<script setup>
const props = defineProps(['title', 'subtitle'])
document.getElementsByTagName('title')[0].innerHTML = props.subtitle
  ? String(props.title) + ': ' + String(props.subtitle)
  : String(props.title)
</script>
<template/>
