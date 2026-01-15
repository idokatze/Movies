<template>
    <main class="movie-list">
        <ul class="movie-grid">
            <li v-for="movie in movies" class="movie-preview" :key="movie._id">
                <MoviePreview
                    class="card"
                    :movie="movie"
                    @remove="$emit('remove', $event)"
                />
            </li>
        </ul>
    </main>
</template>

<script>
    // Imports:
    import MoviePreview from '@/components/MoviePreview.vue'
    export default {
        name: 'MovieList',
        props: {
            movies: {
                type: Array,
                required: true,
            },
        },
        emits: ['remove'],
        components: {
            MoviePreview,
        },
    }
</script>

<style scoped>
    .movie-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
        align-items: stretch;
    }

    .movie-preview {
        border: 1px solid black;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }

    .movie-preview .card {
        flex: 1; /* fills the li height */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
