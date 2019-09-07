<template>
    <div id="app">
        <TopBar />
        <router-view />
        <transition name="slide">
            <ActivityPanel v-if="displayPanel" />
        </transition>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import ActivityPanel from '@/components/ActivityPanel.vue'

export default {
    name: 'App',
    components: {
        TopBar,
        ActivityPanel
    },
    computed: {
        displayPanel() {
            return this.$store.state.displayActivityPanel
        }
    }
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    min-height: 100vh;
}

.slide-enter-active {
    animation-name: slideUp;
    animation-duration: 1s;
}

.slide-leave-active {
    animation-name: slideUp;
    animation-duration: .5s;
    animation-direction: reverse;
}

@keyframes slideUp {
    from {transform: translateY(89vh);}
    to {transform: translateY(0px);}
}
</style>
