<template>
    <Filter :filterBy="filterBy" @filter="onFilter" />
    <section class="btn-container">
        <RouterLink to="/movie/edit" class="add-movie"> Add Movie </RouterLink>
    </section>

    <MovieList :movies="movies" @remove="onRemoveMovie" />
</template>

<script>
    import { movieService } from '@/services/movie.service.js'
    import MovieList from '@/components/MovieList.vue'
    import Filter from '@/components/Filter.vue'
    import {
        showSuccessMsg,
        showErrorMsg,
    } from '@/services/event-bus.service.js'

    export default {
        name: 'MovieIndex',
        props: {},
        emits: [],
        components: {
            MovieList,
            Filter,
        },
        data() {
            return {
                movies: [],
                filterBy: {
                    txt: '',
                    maxRunTime: 0,
                },
            }
        },
        computed: {},
        watch: {},
        created() {
            this.loadMovies()
        },
        methods: {
            async loadMovies() {
                try {
                    this.movies = await movieService.query(this.filterBy)
                } catch (error) {
                    console.error('Could not load movies:', error)
                }
            },
            async onRemoveMovie(movieId) {
                try {
                    await movieService.remove(movieId)
                    this.loadMovies()
                    showSuccessMsg(`Movie ${movieId} deleted`)
                } catch (err) {
                    showErrorMsg(`Couldn't delete movie`)
                }
            },
            onFilter(filterBy) {
                this.filterBy = { ...this.filterBy, ...filterBy }
                this.loadMovies()
            },
        },

        mounted() {},
        beforeUnmount() {},
        unmounted() {},
    }
</script>

<style scoped>
    .btn-container {
        display: flex;
        justify-content: center;

        .add-movie {
            background-color: darkgreen;
            color: white;

            margin-block: 1em;
            padding: 1em 2em;
            border-radius: 10px;
            box-shadow: 5px 5px 15px 5px #888888;
        }
    }
</style>
