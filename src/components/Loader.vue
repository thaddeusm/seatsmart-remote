<template>
    <div id="loader">
        
    </div>
</template>

<script>
export default {
    name: 'Loader'
}
</script>

<style scoped>
@keyframes spin {
    from {transform: rotate(0);}
    to {transform: rotate(360deg);}
}

div {
    height: 100px;
    width: 100px;
    margin: 0 auto;
    border-radius: 100px;
    border-top: 5px solid var(--yellow);
    border-right: 5px solid var(--light-gray);
    border-bottom: 5px solid var(--light-gray);
    border-left: 5px solid var(--light-gray);
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.45, 0.25, 0.60, 0.95);
}
</style>
