<template>
	<section v-if="activity !== null">
		<h4>{{ activity.name }}</h4>
	</section>
</template>

<script>
export default {
	name: 'ActivityProgressViewer',
	computed: {
		activity() {
			return this.$store.state.activityInProgress
		}
	},
	methods: {
		shortName(name) {
			if (name.length > 18) {
				return name.slice(0, 17) + '...'
			} else {
				return name
			}
		}
	}
}
</script>

<style scoped>
section {
	text-align: center;
}

button {
	height: 13em;
	width: 16em;
	margin: 3em;
	border: 1px solid var(--black);
	padding: 1em;
	border-radius: 1em;
}

img {
	width: 100%;
}

h5 {
	margin-top: 4em;
}

h6 {
	margin: .6em 0;
}
</style>