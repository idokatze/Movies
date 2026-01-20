import { createStore } from 'vuex'

import movie from './modules/movie'

const options = {
    strict: true,
    state() {
        return {
            count: 2,
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        change(state, { diff }) {
            state.count += diff
        },
    },
    actions: {},
    getters: {
        count(state) {
            return state.count
        },
    },
    modules: {
        movie,
    },
}

export default createStore(options)
