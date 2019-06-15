<template>
	<main>
		<h2>
			Something is wrong here...
		</h2>
		<h4>
			Try to scan the QR code again.
		</h4>
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

h2 {
	color: var(--light-gray);
}

h4 {
	color: var(--yellow);
	align-self: flex-start;
}
</style>
