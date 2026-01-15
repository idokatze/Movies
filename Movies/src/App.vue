<template>
    <AppHeader />
    <UserMsg />
    <main>
        <RouterView />
    </main>
    <AppFooter />
</template>

<script>
    import AppHeader from '@/components/AppHeader.vue'
    import AppFooter from '@/components/AppFooter.vue'
    import UserMsg from '@/components/UserMsg.vue'

    export default {
        components: {
            AppHeader,
            AppFooter,
            UserMsg,
        },
    }
</script>

<style scoped></style>
