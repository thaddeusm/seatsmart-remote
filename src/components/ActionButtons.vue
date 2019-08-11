<template>
	<aside>
		<section class="button-area left">
			<slot name="left"></slot>
		</section>
		<section class="button-area center">
			<button @click="toggleActivityPanel" v-if="!displayPanel">
				<img id="activitiesIcon" src="@/assets/activities-circle.svg" alt="activities icon">
			</button>
		</section>
		<section class="button-area right">
			<slot name="right"></slot>
		</section>
	</aside>
</template>

<script>
export default {
	name: 'ActionButtons',
	computed: {
		displayPanel() {
			return this.$store.state.displayActivityPanel
		}
	},
	methods: {
		toggleActivityPanel() {
			this.$store.dispatch('toggleActivityPanel')
		}
	}
}
</script>

<style scoped>
aside {
	position: fixed;
	transform: translate3d(0,0,0);
	bottom: 0;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	background: var(--black);
}

.button-area > button {
	height: 60px;
	width: 100%;
	/*max-width: 200px;*/
	font-size: 26px;
	outline: none;
	border: none;
	cursor: pointer;
}

button > img {
	height: 30px;
	vertical-align: middle;
}

.left {
	border-right: 2px solid var(--black);
}

.right {
	border-left: 2px solid var(--black);
	text-align: right;
}

.center {
	text-align: center;
	background: var(--light-gray);
}

#activitiesIcon {
	height: 40px;
}
</style>
