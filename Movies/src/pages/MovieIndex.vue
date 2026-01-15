<template>
    <MovieList :movies="movies" @remove="onRemoveMovie" />
</template>

<script>
    import { movieService } from '@/services/movie.service.js'
    import MovieList from '@/components/MovieList.vue'
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
        },
        data() {
            return {
                movies: [],
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
                    this.movies = await movieService.query()
                } catch (error) {
                    console.error('Could not load movies:', error)
                }
            },
            async onRemoveMovie(movieId) {
                console.log('movieId:', movieId)
                try {
                    await movieService.remove(movieId)
                    this.loadMovies()
                    showSuccessMsg(`Movie ${movieId} deleted`)
                } catch (err) {
                    showErrorMsg(`Couldn't delete movie`)
                }
            },
        },

        mounted() {},
        beforeUnmount() {},
        unmounted() {},
    }
</script>

<style scoped></style>
