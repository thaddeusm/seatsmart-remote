<template>
	<section>
		<h4>{{ activity.name }}</h4>
		<section v-if="activity.status == 'launched'" id="launched">
			<h5>
				Connected Students: {{ activity.connectedUsers.length }} / {{ allStudents.length }}
			</h5>
			<section class="actions">
				<button class="cancel" @click="cancelActivity">cancel</button>
				<button class="action" @click="startActivity" :disabled="activity.connectedUsers == undefined || activity.connectedUsers.length == 0">start {{ activity.activityType }}</button>
			</section>
		</section>
		<section v-else>
			<h5>
				Responses: {{ activity.responses.length }}
			</h5>
			<section class="actions">
				<button class="cancel" @click="cancelActivity">end</button>
			</section>
		</section>
	</section>
</template>

<script>
export default {
	name: 'ActivityProgressViewer',
	computed: {
		activity() {
			return this.$store.state.activityInProgress
		},
		allStudents() {
			return this.$store.state.students
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
		cancelActivity() {
			let actionObj = {
				name: 'cancel activity',
				data: {
					activity: this.activity
				}
			}
			this.$store.dispatch('pushToActionQueue', actionObj)
		},
		startActivity() {
			let actionObj = {
				name: 'start activity',
				data: {
					activity: this.activity
				}
			}
			this.$store.dispatch('pushToActionQueue', actionObj)
		}
	}
}
</script>

<style scoped>
section {
	text-align: center;
}

#launched {
	display: grid;
	grid-template-rows: 1fr 1fr;
	align-items: center;
	height: 50vh;
}

.actions {
	text-align: center;
}

button {
	padding: 5px 10px;
	color: var(--black);
	font-size: 20px;
	border-radius: 5px;
	cursor: pointer;
	outline: none;
	margin: 20px;
	box-shadow: 0px 0px 1px var(--black);
}

button:disabled {
	cursor: not-allowed;
	opacity: .5;
}

.action {
	background: var(--yellow);
}

.cancel {
	background: var(--gray);
	color: var(--white);
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