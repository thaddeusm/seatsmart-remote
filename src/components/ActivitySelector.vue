<template>
	<section>
		<h4>Select an Activity to Launch</h4>
		<button v-if="!loading" v-for="(activity, index) in activities" @click="launchActivity(index)">
			<img v-if="activity.activityType == 'survey'" src="@/assets/survey-illustration.svg" alt="survey-illustration">
			<img v-else-if="activity.activityType == 'response pool'" src="@/assets/response-pool-illustration.svg" alt="response pool illustration">
			<img v-else-if="activity.activityType == 'information gap'" src="@/assets/information-gap-illustration.svg" alt="information gap illustration">
			<img v-else-if="activity.activityType == 'word cloud'" src="@/assets/word-cloud-illustration.svg" alt="word cloud illustration">
			<h6>{{ shortName(activity.name) }}</h6>
		</button>
		<Loader v-if="loading" class="loader" />
	</section>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
	name: 'ActivitySelector',
	components: {
		Loader
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		activities() {
			return this.$store.state.activities
		}
	},
	methods: {
		shortName(name) {
			if (name.length > 18) {
				return name.slice(0, 17) + '...'
			} else {
				return name
			}
		},
		launchActivity(index) {
			let actionObj = {
				name: 'launch activity',
				data: {
					activity: this.activities[index]
				}
			}
			this.loading = true
			this.$store.dispatch('pushToActionQueue', actionObj)
			this.$router.push('/activity')
		}
	}
}
</script>

<style scoped>
@media screen and (max-width: 800px) {
	section {
		text-align: center;
		max-height: 45vh;
		overflow: auto;
	}
}

@media screen and (min-width: 801px) {
	section {
		text-align: center;
		max-height: 55vh;
		overflow: auto;
	}
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

h6 {
	margin: .6em 0;
	color: var(--black);
}

.loader {
	margin-top: 2em;
}
</style>
