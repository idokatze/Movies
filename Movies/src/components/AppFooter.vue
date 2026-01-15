<template>
    <footer>
        <p>© 2026 Baby Goat App</p>
        <nav class="footer-links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/movie">Movies</RouterLink>
        </nav>
    </footer>
</template>

<script>
    export default {
        name: 'AppFooter',
    }
</script>

<style scoped>
    footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.5em;
        background-color: lightgrey;
        box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.15);
        font-weight: bolder;
        gap: 1em;
    }

    .footer-links {
        display: flex;
        gap: 2em;
    }
</style>
