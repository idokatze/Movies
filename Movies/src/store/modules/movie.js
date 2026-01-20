import { movieService } from '@/services/movie.service'

export default {
    state() {
        return {
            movies: [],
            filterBy: {
                txt: '',
                maxRunTime: 0,
            },
        }
    },
    mutations: {
        setMovies(state, { movies }) {
            state.movies = movies
        },
        removeMovie(state, { movieId }) {
            const idx = state.movies.findIndex((movie) => movie._id === movieId)
            state.movies.splice(idx, 1)
        },
        setFilterBy(state, { filterBy }) {
            state.filterBy = { ...state.filterBy, ...filterBy }
        },
    },
    actions: {
        async loadMovies({ state, commit }) {
            try {
                const movies = await movieService.query(state.filterBy)
                commit({ type: 'setMovies', movies })
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async removeMovie({ state, commit }, { movieId }) {
            try {
                await movieService.remove(movieId)
                commit({ type: 'removeMovie', movieId })
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async setFilterBy({ state, commit }, { filterBy }) {
            try {
                await commit({ type: 'setFilterBy', filterBy })
            } catch (error) {
                console.log(error)
                throw error
            }
        },
    },
    getters: {
        movies(state) {
            return state.movies
        },
        filterBy(state) {
            return state.filterBy
        },
    },
}
