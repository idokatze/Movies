<template>
    <article class="movie-card">
        <img
            :src="movie.posterUrl || '/fallback.jpg'"
            @error="$event.target.src = '/fallback.jpg'"
            alt="Movie Poster"
            class="card-img"
        />
        <div class="movie-info">
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="release-year">{{ movie.releaseYear }}</p>
        </div>
        <div class="actions">
            <RouterLink :to="`movie/${movie._id}`"
                ><button class="open-details pill-btn">
                    Details
                </button></RouterLink
            >
            <button
                @click="$emit('remove', movie._id)"
                class="remove-movie pill-btn"
            >
                Delete
            </button>
        </div>
    </article>
</template>

<script>
    // Imports:
    export default {
        name: 'MoviePreview',
        props: {
            movie: { type: Object, required: true },
        },
        emits: ['remove'],
    }
</script>

<style scoped>
    .movie-card {
        background-color: #fff;
        .card-img {
            width: 10em;
            height: 10em;
            object-fit: cover;
        }

        .actions {
            display: inline-flex;
            justify-content: space-around;

            .open-details {
                background-color: lightblue;
                border: 1px solid rgba(17, 17, 188);
                padding-inline: 1em;
            }

            .remove-movie {
                background-color: red;
                border: 1px solid rgb(51, 1, 51);
                padding-inline: 1em;
            }
        }
    }
</style>
