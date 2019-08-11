<template>
    <header v-if="currentRoute !== '/exit' && currentRoute !== '/code'">
        <section id="left">
            <transition name="flip">
                <img v-if="currentRoute == '/'" src="@/assets/logo.svg" class="icon" alt="seatsmart logo" key="logo">
                <img v-else-if="currentRoute.indexOf('/note') !== -1" src="@/assets/note-icon.svg" class="icon" alt="note icon" key="note">
                <img v-else-if="currentRoute == '/random'" src="@/assets/random-icon.svg" class="icon" alt="random icon" key="random">
                <img v-else src="@/assets/logo.svg" class="icon" alt="seatsmart logo" key="logo">
            </transition>
        </section>
        <section id="center">
            <h3 class="short-name">{{ shortName }}</h3>
            <h3 class="long-name">{{ longName }}</h3>
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
    computed: {
        shortName() {
            // shorten long class names
            let rawName = this.longName

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
        longName() {
            return this.$store.state.classInfo.name
        },
        currentRoute() {
            // help change UI icon to match the route

            return this.$route.path
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    height: 100%;
    min-height: 10vh;
    display: grid;
    grid-template-columns: 15% 70% 15%;
    grid-template-areas: "left center right";
    background: var(--black);
}

@media screen and (max-width: 800px) {
    .long-name {
        display: none;
    }
}

@media screen and (min-width: 801px) {
    .short-name {
        display: none;
    }
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

.icon {
    height: 30px;
}

#right {
    text-align: right;
    grid-area: right;
}

.flip-enter-active {
    animation-name: flip;
    animation-duration: .5s;
}

.flip-enter-active {
    animation-name: flip;
    animation-duration: .5s;
}

@keyframes flip {
    from {transform: rotateX(90deg);}
    to {transform: rotateX(0deg);}
}
</style>
