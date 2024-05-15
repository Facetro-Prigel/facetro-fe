<template>
    <div>
        <NavSideBar />

        <div>
            <router-view/>
        </div>
        
    </div>
    
</template>

<script setup>
    import NavSideBar from "@/layouts/NavSideBar.vue"
</script>