<template>
    <div class="w-full bg-primary-500">
        <div class="flex justify-between items-center h-[100px]">
            <!-- <div class="p-3 cursor-pointer hover:bg-primary-400" @click="clickHambuger"> -->
                <!-- <i class="pi pi-bars"></i> -->
            <!-- </div> -->
            <div class="py-2"></div>
            <div class="flex space-x-3 items-center justify-center px-3">
                <div class="text-sm text-white">{{ user.name }}</div>
                <Avatar  
                    :image="BASE_URL + user.avatar"
                    class="mr-2"  
                    shape="circle" 
                    @click="toggle" 
                    aria-haspopup="true" 
                    aria-controls="overlay_menu" 
                />
                <Menu 
                    id="overlay_menu" 
                    ref="menu" 
                    :model="items" 
                    :popup="true" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import BASE_URL from '@/stores/config'
import VueCookies from 'vue-cookies'
export default {
    props: {
        dataOpenSidebar: Boolean,
        clickHambuger: Function
    },
    data() {
        return {
            BASE_URL: BASE_URL,
            user: VueCookies.get('user'),
            items: [
                {
                    label: 'Change Password',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.$toast.add({
                            severity: 'success',
                            summary: 'Updated',
                            detail: 'Data Updated',
                            life: 3000
                        });
                    }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: this.logout
                }
            ]
        }
    },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        logout() {
            VueCookies.remove('token');
            VueCookies.remove('user');

            this.$router.push({ name: 'login' });
        }
    }
}
</script>

<style scoped>
</style>
	