<template>
    <header>
        <img src="@/assets/images/baby-goat.svg" alt="App Logo" />
        <nav class="nav-links">
            <RouterLink to="/movie">Movies</RouterLink>
            <RouterLink to="/">Home</RouterLink>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'AppHeader',
    }
</script>

<style scoped>
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-inline: 2em;
        background-color: lightgrey;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        font-weight: bolder;

        img {
            width: 4em;
        }

        .nav-links {
            display: flex;
            gap: 2em;
        }
    }
</style>
