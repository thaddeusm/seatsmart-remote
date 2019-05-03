<template>
    <div id="app">
        <TopBar />
        <router-view/>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'

export default {
    name: 'App',
    components: {
        TopBar
    }
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
