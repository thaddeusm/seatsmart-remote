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
* {
    margin: 0;
    padding: 0;
    touch-action: manipulation;
}

/* inspired by FHSU colors */
:root {
    --yellow: #FCBB04;
    --red: #D2360A;
    --black: #000000;
    --dark-gray: #040404;
    --gray: #6C6C6C;
    --light-gray: #E5E5E5;
    --white: #FFFFFF;
}

/* custom text highlight color */
::selection {
    background: var(--yellow);
}

html, body, #app {
    width: 100%;
    height: 100%;
    background: var(--black);
    font-family: "ArchivoNarrow";
}

h1 {
    font-family: "ArchivoNarrow";
    -webkit-user-select: none;
    font-weight: 400;
    font-size: 32px;
}

h2 {
    font-family: "ArchivoNarrow";
    font-weight: 400;
    -webkit-user-select: none;
    font-size: 28px;
}

h3 {
    font-family: "ArchivoNarrow";
    font-weight: 500;
    -webkit-user-select: none;
    font-size: 26px;
}

h4 {
    font-family: "ArchivoNarrow";
    font-weight: 400;
    -webkit-user-select: none;
    font-size: 24px;
}

h5 {
    font-family: "ArchivoNarrow";
    font-weight: 400;
    -webkit-user-select: none;
    font-size: 16px;
}

h6 {
    font-family: "ArchivoNarrow";
    font-weight: 400;
    -webkit-user-select: none;
    font-size: 14px;
}

p {
    -webkit-user-select: none;
    font-family: "ArchivoNarrow";
    font-size: 18px;
    line-height: 1.5;
}

span {
    -webkit-user-select: none;
    font-family: "ArchivoNarrow";
}

li {
    -webkit-user-select: none;
    font-family: "ArchivoNarrow";
}

input[type=text], input[type=button] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-border-radius: none;
    outline: none;
    border: none;
}

*:focus {
    outline: 0 !important;
}

button {
    -webkit-user-select: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-border-radius: none;
    border: none;
    background: none;
    font-family: "ArchivoNarrow";
    outline: none;
    cursor: pointer;
}

a {
    -webkit-user-select: none;
    font-family: "ArchivoNarrow";
}

img {
    -webkit-user-select: none;
}

input {
    font-family: "ArchivoNarrow";
}

textarea {
    font-family: "ArchivoNarrow";
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
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
    from {transform: translateY(88vh);}
    to {transform: translateY(0px);}
}
</style>
