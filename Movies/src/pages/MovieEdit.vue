<template>
    <section v-if="!movie">Loading...</section>
    <section v-else class="form-container">
        <form class="edit-movie-form" @submit.prevent="onSaveMovie">
            <label for="movie-title">Title</label>
            <input v-model="movie.title" type="text" id="movie-title" />

            <label for="movie-release">Release Year</label>
            <input
                v-model="movie.releaseYear"
                type="number"
                id="movie-release"
            />

            <label for="running-time">Running Time</label>
            <input
                v-model="movie.runningTime"
                type="number"
                id="running-time"
            />

            <label for="movie-director">Director</label>
            <input v-model="movie.director" type="text" id="movie-director" />

            <label for="movie-genre">Genre</label>
            <input v-model="movie.genre" type="text" id="movie-genre" />

            <div class="actor-input-container">
                <input
                    class="input"
                    type="text"
                    placeholder="Type actor and press Enter"
                    v-model="newActor"
                    @keydown.enter.prevent="onAddActor"
                />
            </div>

            <div class="added-container">
                <div
                    class="actor-chip"
                    v-for="(actor, index) in movie.actors"
                    :key="index"
                >
                    <span>{{ actor }}</span>
                    <button
                        type="button"
                        aria-label="Remove actor"
                        @click="onRemoveActor(index)"
                    >
                        ×
                    </button>
                </div>
            </div>

            <div class="poster-container">
                <img
                    :src="movie.posterUrl || fallbackPoster"
                    class="poster-img"
                    alt="Movie Poster"
                    @error="onPosterError"
                />

                <button
                    v-if="!movie.posterUrl"
                    type="button"
                    @click="getPoster"
                    class="btn-tertary"
                >
                    Get Poster
                </button>
            </div>

            <div class="actions">
                <RouterLink to="/movie" class="btn-secondary">
                    Back
                </RouterLink>

                <button type="submit" class="btn-primary">Save</button>
            </div>
        </form>
    </section>
</template>

<script>
    // Imports:
    import { movieService } from '@/services/movie.service.js'
    import {
        showSuccessMsg,
        showErrorMsg,
    } from '@/services/event-bus.service.js'

    export default {
        name: '',
        props: {},
        emits: [],
        components: {},
        data() {
            return {
                movie: null,
                newActor: '',
                posterError: false,
                fallbackPoster: '/fallback.jpg',
            }
        },
        computed: {},
        watch: {},
        async created() {
            const movieId = this.$route.params.id
            if (movieId) {
                try {
                    this.movie = await movieService.get(movieId)
                } catch (err) {
                    console.error('Failed to load movie', err)
                }
            } else {
                this.movie = movieService.getEmptyMovie()
            }
        },
        mounted() {},
        methods: {
            onAddActor() {
                const actor = this.newActor.trim()
                if (!actor) return
                if (!this.movie) return
                this.movie.actors.push(actor)
                this.newActor = ''
            },
            onRemoveActor(index) {
                this.movie.actors.splice(index, 1)
            },
            async onSaveMovie() {
                try {
                    await movieService.save(this.movie)
                    this.$router.push('/movie')
                    showSuccessMsg(`Movie successfully saved`)
                } catch (error) {
                    showErrorMsg(`Couldn't delete movie`)
                }
            },
            async getPoster() {
                const title = this.movie.title?.trim()
                if (!title) return

                const posterUrl = await movieService.getMoviePoster(title)
                this.movie.posterUrl = posterUrl || ''
            },

            onPosterError(e) {
                e.target.src = this.fallbackPoster
                this.movie.posterUrl = ''
            },
        },
        beforeUnmount() {},
        unmounted() {},
    }
</script>

<style scoped>
    /* ===== Container ===== */
    .form-container {
        max-width: 540px;
        margin: 2em 1em;
        padding: 2em;
        background-color: #ffffff;
        border-radius: 14px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
    }

    /* ===== Form ===== */
    .edit-movie-form {
        display: flex;
        flex-direction: column;
        gap: 1.3em;
    }

    /* ===== Labels ===== */
    .edit-movie-form label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #444;
        margin-bottom: 0.2em;
    }

    /* ===== Inputs ===== */
    .edit-movie-form input {
        padding: 0.75em 0.95em;
        border-radius: 8px;
        border: 1px solid #d0d0d0;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .edit-movie-form input:focus {
        border-color: navy;
        box-shadow: 0 0 0 2px rgba(0, 0, 128, 0.15);
        outline: none;
    }

    .poster-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;

        /* Tertary Button (Add Poster) */
        .btn-tertary {
            padding: 0.5em 1em;
            border: none;
            border-radius: 10px;
            background-color: rgb(76, 76, 221);
            color: white;
            transition: background-color 0.2s ease, transform 0.1s ease;
        }

        .btn-tertary:hover {
            background-color: navy;
        }

        .btn-tertary:active {
            transform: scale(0.97);
        }
    }
    /* ===== Actor Input ===== */
    .actor-input-container {
        margin-top: 0.5em;
    }

    /* ===== Actor Chips ===== */
    .added-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6em;
        margin-top: 0.3em;
    }

    .actor-chip {
        display: flex;
        align-items: center;
        gap: 0.45em;
        padding: 0.35em 0.75em;
        background-color: #f0f2ff;
        border-radius: 999px;
        font-size: 0.9rem;
        color: #333;
    }

    .actor-chip button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.15rem;
        line-height: 1;
        color: #555;
        padding: 0;
    }

    .actor-chip button:hover {
        color: #c00;
    }

    /* ===== Actions ===== */
    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2.2em;
        gap: 1em;
    }

    /* Shared button styles */
    .btn-primary,
    .btn-secondary {
        padding: 0.85em 2.5em;
        border-radius: 999px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    /* Primary (Save) */
    .btn-primary {
        border: none;
        background-color: navy;
        color: white;
        transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .btn-primary:hover {
        background-color: #000080cc;
    }

    .btn-primary:active {
        transform: scale(0.97);
    }

    /* Secondary (Back) */
    .btn-secondary {
        border: 1px solid #ccc;
        background-color: #f6f6f6;
        color: #333;
        transition: background-color 0.2s ease;
    }

    .btn-secondary:hover {
        background-color: #e8e8e8;
    }
</style>
