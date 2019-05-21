<template>
    <header v-if="currentRoute !== '/exit'">
        <section id="left">
            <img v-if="currentRoute == '/'" src="@/assets/logo.svg" id="logo" alt="seatsmart logo">
            <img v-else-if="currentRoute.indexOf('/note') !== -1" src="@/assets/note.svg" id="noteIcon" class="icon" alt="note icon">
            <img v-else-if="currentRoute == '/random'" src="@/assets/random.svg" class="icon" alt="random icon">
            <img v-else src="@/assets/logo.svg" id="logo" alt="seatsmart logo">
        </section>
        <section id="center">
            <h3>{{ name }}</h3>
        </section>
        <section id="right">
            <Status />
        </section>
    </header>
</template>

<script>
import Status from '@/components/Status.vue'

export default {
    name: 'TopBar',
    components: {
        Status
    },
    data() {
        return {
            
        }
    },
    computed: {
        name() {
            // shorten long class names
            let rawName = this.$store.state.classInfo.name

            if (rawName !== null) {
                if (rawName.length > 10) {
                    return rawName.slice(0, 10) + '...'
                } else {
                    return rawName
                }
            } else {
                return rawName
            }

        },
        currentRoute() {
            return this.$route.path
        }
    }
}
</script>

<style scoped>
@keyframes scale {
    0% {transform: scale(1);}
    50% {transform: scale(1.3);}
    100% {transform: scale(1);}
}

header {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "left center right";
    background: var(--black);
}

section {
    padding: 10px;
}

#left {
    text-align: left;
    grid-area: left;
}

#center {
    text-align: center;
}

h3 {
    color: var(--white);
}

img {
    animation-name: scale;
    animation-delay: .8s;
    animation-duration: 1s;
    animation-timing-function: ease-in;
}

#logo {
    height: 30px;
}

.icon {
    background: var(--yellow);
    height: 22px;
    padding: 4px;
    border-radius: 4px;
}

#right {
    text-align: right;
    grid-area: right;
}
</style>
