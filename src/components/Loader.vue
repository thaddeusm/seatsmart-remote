<template>
    <div id="loader" :class="[size == 'small' ? 'small' : 'large']">
        
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        size: String
    }
}
</script>

<style scoped>
@keyframes spin {
    from {transform: rotate(0);}
    to {transform: rotate(360deg);}
}

div {
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.45, 0.25, 0.60, 0.95);
}

.large {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    margin: 0 auto;
    border-top: 5px solid var(--yellow);
    border-right: 5px solid var(--light-gray);
    border-bottom: 5px solid var(--light-gray);
    border-left: 5px solid var(--light-gray);
}

.small {
    display: inline-block;
    float: right;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    margin: 0 5px;
    border-top: 2px solid var(--gray);
    border-right: 2px solid var(--light-gray);
    border-bottom: 2px solid var(--light-gray);
    border-left: 2px solid var(--light-gray);
}
</style>
