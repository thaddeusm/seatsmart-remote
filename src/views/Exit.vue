<template>
	<main>
		<img src="@/assets/remotedisconnect.svg" alt="disconnected icon">
		<h2>
			The remote is disconnected.
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
	height: 100%;
	display: grid;
	justify-content: center;
	align-items: center;
	text-align: center;
	grid-template-rows: 50% 50%;
	grid-template-areas: 
		"image"
		"message";
}

img {
	width: 4em;
	vertical-align: middle;
	display: block;
	margin: 0 auto;
	grid-area: image;
}

h2 {
	color: var(--light-gray);
	align-self: flex-start;
	grid-area: message;
}
</style>