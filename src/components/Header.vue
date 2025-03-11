<template>
    <div class="w-full bg-primary-500">
        <div class="flex justify-between items-center h-[100px]">
            <!-- <div class="p-3 cursor-pointer hover:bg-primary-400" @click="clickHambuger"> -->
                <!-- <i class="pi pi-bars"></i> -->
            <!-- </div> -->
            <div class="py-2"></div>
            <Button
                @click="toggle" 
                aria-haspopup="true" 
                aria-controls="overlay_menu" 
                severity="info"
            >
                <div class="flex space-x-3 items-center justify-center px-3">
                <div class="flex flex-col justify-center">
                    <div class="font-bold text-white">{{ user.name }}</div>
                    <p class="text-sm text-white text-right">{{ user.user_roles.join(', ') }}</p>
                </div>
                <Avatar  
                    :image="BASE_URL +'avatar/'+ user.avatar"
                    class="mr-2" 
                    shape="circle"
                />
                <Menu 
                    id="overlay_menu" 
                    ref="menu" 
                    :model="items" 
                    :popup="true" 
                />
            </div>
            </Button>
            
        </div>
    </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import Button from 'primevue/button';
const BASE_URL = import.meta.env.VITE_BACKEND_API
export default {
    props: {
        dataOpenSidebar: Boolean,
        clickHambuger: Function
    },
    data() {
        return {
            BASE_URL: BASE_URL,
            user: VueCookies.get('user_data') ?? '',
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
            VueCookies.remove('user_data');
            this.$router.push({ name: 'login' });
        }
    }
}
</script>

<style scoped>
</style>
	