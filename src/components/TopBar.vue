<template>
    <header>
        <section id="left">
            <img src="@/assets/logo.svg" id="logo" alt="seatsmart logo">
        </section>
        <section id="center">
            <h2>{{ name }}</h2>
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
            return this.$store.state.classInfo.name
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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

h2 {
    color: var(--white);
}

#logo {
    height: 30px;
}

#right {
    text-align: right;
    grid-area: right;
}
</style>
