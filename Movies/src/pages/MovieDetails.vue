<template class="page">
    <section v-if="movie" class="movie-details">
        <img
            :src="movie.posterUrl || '/fallback.jpg'"
            @error="$event.target.src = '/fallback.jpg'"
            alt="Movie Poster"
            class="card-img"
        />
        <article class="movie-info">
            <h2>
                {{ movie.title }} <span>({{ movie.releaseYear }})</span>
            </h2>

            <h4>Director - {{ movie.director }}</h4>
            <div class="actors">
                <span
                    v-for="(actor, index) in movie.actors"
                    :key="index"
                    class="actor"
                >
                    {{ actor }}
                </span>
            </div>

            <div class="more-details">
                <p>{{ movie.genre }} - {{ movie.runningTime }} min</p>
            </div>
        </article>
    </section>
    <section class="edit-area" v-if="movie">
        <RouterLink :to="`/movie/edit/${movie._id}`" class="edit-movie">
            Edit Movie Info
        </RouterLink>
    </section>
</template>

<script>
    // Imports:
    import { movieService } from '@/services/movie.service.js'

    export default {
        name: 'MovieDetails',
        props: {},
        emits: [],
        components: {},
        data() {
            return {
                movie: null,
            }
        },
        computed: {},
        watch: {},
        async created() {
            const movieId = this.$route.params.id
            this.movie = await movieService.get(movieId)
        },
        mounted() {},
        methods: {},
        beforeUnmount() {},
        unmounted() {},
    }
</script>

<style scoped>
    .movie-details {
        margin: 1em;
        padding: 1em;
        background-color: lightpink;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 3em;
        align-items: stretch;
    }

    .card-img {
        width: 100%;
        max-width: 200px;
        height: auto;
        object-fit: cover;
        border-radius: 0.5em;
    }

    .movie-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    h2 span {
        font-weight: normal;
    }

    .title-row h4 {
        margin: 0.2em 0;
        font-weight: normal;
        color: #333;
    }

    .actors {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        margin: 0.5em 0;
    }

    .actor {
        background-color: #ffe4e1; /* light contrasting bg */
        padding: 0.2em 0.5em;
        border-radius: 0.3em;
        font-size: 0.9em;
    }

    .more-details p {
        margin: 0;
        font-style: italic;
        color: #555;
    }

    .edit-area {
        display: flex;
        justify-content: center;

        .edit-movie {
            margin-top: 10%;
            background-color: navy;
            color: white;
            padding: 1em;
            border-radius: 999px;

            &:hover {
                background-color: #00008050;
            }
        }
    }
</style>
