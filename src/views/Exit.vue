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
	name: 'Exit',
	methods: {
		resetStore() {
			this.$store.dispatch('resetStore')
		},
		routeToCodeView() {
			let scope = this

			setTimeout(function() {
				scope.$router.push('/code')
			}, 3000, scope)
		}
	},
	mounted() {
		this.resetStore()
		this.routeToCodeView()
	}
}
</script>

<style scoped>
main {
	width: 100%;
	height: 80%;
	display: grid;
	justify-content: center;
	align-items: center;
	text-align: center;
	grid-template-rows: 1fr 1fr;
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