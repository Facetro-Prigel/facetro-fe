<template>
    <div class="w-full bg-primary-500">
        <div class="flex justify-between items-center h-[100px] ">
            <!-- <div class="p-3 cursor-pointer hover:bg-primary-400" @click="clickHambuger"> -->
                <!-- <i class="pi pi-bars"></i> -->
            <!-- </div> -->
			<div class="py-2">
			</div>
            <div class="flex space-x-3 items-center justify-center px-3">
                <div class="text-sm text-white">Admin</div>
                <Avatar icon="cursor-pointer pi pi-user" class="mr-2" style="background-color:#9c27b0; color: #ffffff" shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
            </div>
        </div>
    </div>
</template>

<script>
export default{
	props:{
		dataOpenSidebar: Boolean,
		clickHambuger: Function
	},
    data() {
		return {
			items: [
				{
					label: 'Change Password',
					icon: 'pi pi-refresh',
					command: () => {
						this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
					}
				},
				{
					label: 'Exit',
					icon: 'pi pi-times',
					command: () => {
						this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
					}
				}
			]
		}
	},
    methods:{
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
    }
}

</script>

<style scoped>

</style>