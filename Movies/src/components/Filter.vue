<template>
    <fieldset>
        <legend>Filter Movies</legend>

        <label>By Text</label>
        <input
            type="text"
            :value="filterBy.txt"
            @input="onInput('txt', $event.target.value)"
        />

        <label>By Max Runtime</label>
        <input
            type="number"
            :value="filterBy.maxRunTime"
            :placeholder="filterBy.maxRunTime === 0 ? 'txt' : ''"
            @input="onInput('maxRunTime', $event.target.value)"
        />
    </fieldset>
</template>

<script>
    import { debounce } from '@/services/util.service.js'

    export default {
        name: 'Filter',
        props: {
            filterBy: { type: Object, required: true },
        },
        emits: ['filter'],
        created() {
            // Debounced emitter for any property change
            this.emitFilter = debounce((newFilter) => {
                this.$emit('filter', { ...newFilter })
            }, 300)
        },
        methods: {
            onInput(field, value) {
                const newFilter = { ...this.filterBy, [field]: value }
                this.emitFilter(newFilter)
            },
        },
    }
</script>

<style scoped>
    fieldset {
        border: 1px solid #ccc;
        padding: 1em;
        border-radius: 6px;
    }

    label {
        display: block;
        margin-top: 0.5em;
        font-weight: 600;
    }

    input {
        width: 100%;
        padding: 0.4em 0.6em;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-top: 0.2em;
        box-sizing: border-box;
    }
</style>
