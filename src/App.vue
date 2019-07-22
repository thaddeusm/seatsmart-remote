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
body {
    min-height: 100vh;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
}
</style>
