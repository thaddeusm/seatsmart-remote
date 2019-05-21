<template>
    <header v-if="currentRoute !== '/exit'">
        <section id="left">
            <transition name="fade" mode="out-in">
                <img v-if="currentRoute == '/'" src="@/assets/logo.svg" id="logo" alt="seatsmart logo" key="logo">
                <img v-else-if="currentRoute.indexOf('/note') !== -1" src="@/assets/note.svg" id="noteIcon" class="icon" alt="note icon" key="note">
                <img v-else-if="currentRoute == '/random'" src="@/assets/random.svg" class="icon" alt="random icon" key="random">
                <img v-else src="@/assets/logo.svg" id="logo" alt="seatsmart logo" key="logo">
            </transition>
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
