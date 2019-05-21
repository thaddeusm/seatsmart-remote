<template>
	<main>
		<img src="@/assets/remotedisconnect.svg" alt="disconnected icon">
		<h2>
			The remote connecton was closed.
		</h2>
	</main>
</template>

<script>
export default {
	name: 'Exit'
}
</script>

<style scoped>
main {
	width: 100vw;
	height: 80vh;
	display: grid;
	justify-content: center;
	align-items: center;
	text-align: center;
}

img {
	width: 4em;
	vertical-align: middle;
	display: block;
	margin: 0 auto;
}

h2 {
	color: var(--light-gray);
	align-self: flex-start;
}
</style>