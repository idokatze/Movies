<template>
    <div v-if="msg.txt" :class="msg.type" class="user-msg">
        <p>{{ msg.txt }}</p>
    </div>
</template>

<script>
    import { eventBus } from '@/services/event-bus.service'

    export default {
        name: '',
        props: {},
        emits: [],
        components: {},
        data() {
            return {
                msg: {
                    txt: '',
                    type: '',
                },
            }
        },
        computed: {},
        watch: {},
        created() {
            this.unsubscribe = eventBus.on('user-msg', this.showMsg)
        },
        mounted() {},
        methods: {
            showMsg(msg) {
                this.msg = msg

                setTimeout(() => (this.msg.txt = ''), 2000)
            },
        },
        beforeUnmount() {
            this.unsubscribe()
        },
        unmounted() {},
    }
</script>

<style scoped>
    .user-msg {
        position: fixed;
        top: 40px;
        right: 1em;

        min-width: 200px;
        padding: 0.5em 1em;
        background-color: darkcyan;
        border-radius: 0.5em;

        color: whitesmoke;
        font-weight: bold;

        &.success {
            background-color: darkseagreen;
        }

        &.error {
            background-color: orangered;
        }
    }
</style>
