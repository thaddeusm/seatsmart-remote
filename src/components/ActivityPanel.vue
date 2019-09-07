<template>
	<aside>
		<div id="activityArea">
			<h2>
				<img id="activitiesIcon" src="@/assets/activities-outline.svg" alt="activities icon">
			</h2>
			<ActivitySelector v-if="activityInProgress == null" />
			<ActivityProgressViewer v-else />
		</div>
		<div id="closeArea">
			<button @click="toggleActivityPanel">
				<img src="@/assets/closeblack.svg" alt="close icon">
			</button>
		</div>
	</aside>
</template>

<script>
import ActivitySelector from '@/components/ActivitySelector.vue'
import ActivityProgressViewer from '@/components/ActivityProgressViewer.vue'

export default {
	name: 'ActivityPanel',
	components: {
		ActivitySelector,
		ActivityProgressViewer
	},
	data() {
		return {

		}
	},
	computed: {
		activityInProgress() {
			return this.$store.state.activityInProgress
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
/*@media screen and (max-width: 800px) {
	aside {
		height: 89vh;
		grid-template-rows: 1fr 60px;
	}
}

@media screen and (min-width: 801px) {
	aside {
		
	}
}*/

aside {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 88vh;
	grid-template-rows: 1fr 90px;
	width: 100vw;
	z-index: 1500;
	background: var(--light-gray);
	display: grid;
	grid-template-areas: 
		"activity"
		"close";
}

#activityArea {
	grid-area: activity;
}

h2 {
	text-align: center;
	margin: 25px auto;
}

#activitiesIcon {
	width: 50px;
}

img {
	vertical-align: middle;
}

#closeArea {
	grid-area: close;
	text-align: center;
	align-self: center;
}
</style>
