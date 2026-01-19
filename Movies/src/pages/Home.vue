<template>
    <div class="home">
        <header class="header">
            <h1>Welcome Home</h1>
            <p class="subtitle">A simple and elegant Vue page</p>
        </header>

        <main class="main-content">
            <button @click="greet" class="btn">Say Hello</button>
            <p v-if="message">{{ message }}</p>

            <div class="counter-container">
                <button @click="onDecrement">Decrement</button>
                <p>{{ count }}</p>
                <button @click="onIncrement">Increment</button>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                message: '',
            }
        },
        methods: {
            greet() {
                this.message = 'Hello! Welcome to your home page 🌿'
            },
            onIncrement() {
                this.$store.commit({ type: 'change', diff: 1 })
            },
            onDecrement() {
                this.$store.commit({ type: 'change', diff: -1 })
            },
        },
        computed: {
            count() {
                return this.$store.getters.count
            },
        },
    }
</script>

<style scoped>
    .home {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: 'Segoe UI', sans-serif;
        text-align: center;
        background: #f9f9f9;
        color: #333;
        padding: 2rem;
    }

    .header {
        margin-bottom: 3rem;
    }

    .subtitle {
        color: #666;
        font-size: 1rem;
    }

    .main-content {
        flex: 1;
    }

    .btn {
        background: #4caf50;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background 0.3s;
    }

    .btn:hover {
        background: #45a049;
    }

    .footer {
        margin-top: 3rem;
        font-size: 0.9rem;
        color: #999;
    }
</style>
