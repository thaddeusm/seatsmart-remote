<template>
	<main>
		<Loader id="loader" v-if="!loaded" />
		<StudentList 
			v-on:list-loaded="loaded = true" 
			id="studentList" 
			v-on:student-chosen="routeToNote"
			:chosenStudents="[]"
		/>
		<StudentGrid 
			v-on:grid-loaded="loaded = true" 
			id="studentGrid" 
			v-on:student-chosen="routeToNote"
			:chosenStudents="[]"
		/>
		<ActionButtons v-if="loaded">
			<template slot="left">
				<button class="action-button" @click="$router.push('/note/none')" :disabled="absentStudents.length == students.length">
					<img src="@/assets/note.svg" alt="note icon">
				</button>
			</template>
			<template slot="right">
				<button class="action-button" @click="$router.push('/random')" :disabled="absentStudents.length == students.length">
					<img src="@/assets/random.svg" alt="dice icon">
				</button>
			</template>
		</ActionButtons>
	</main>
</template>

<script>
import Loader from '@/components/Loader.vue'
import StudentList from '@/components/StudentList.vue'
import StudentGrid from '@/components/StudentGrid.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
	name: 'home',
	props: {
		room: String
	},
	components: {
		Loader,
		StudentList,
		StudentGrid,
		ActionButtons
	},
	data() {
		return {
			loaded: false,
			randomStudent: ''
		}
	},
	computed: {
		students() {
			return this.$store.state.students
		},
		absentStudents() {
			return this.$store.state.absentStudents
		},
		activityInProgress() {
			return this.$store.state.activityInProgress
		}
	},
	watch: {
		activityInProgress(newValue, oldValue) {
			if (newValue !== null) {
				this.$router.push('/activity')
			}
		}
	},
	methods: {
		routeToNote(student) {
			// when a student is selected, pass their id to add note view
			this.$router.push(`/note/${student._id}`)
		}
	},
	mounted() {
		if (this.room) {
			this.$store.dispatch('setRoomID', this.room)
		} else {
			this.$router.push('/code')
		}
	}
}
</script>


<style scoped>
@media screen and (max-width: 800px) {
	#studentGrid {
		display: none;
	}

	#loader {
		margin-top: 100px;
	}
}

@media screen and (min-width: 801px) {
	#studentList {
		display: none;
	}

	#loader {
		margin-top: 120px;
	}
}

.action-button {
	background: var(--yellow);
}

.action-button:disabled {
	cursor: not-allowed;
	opacity: .5;
}
</style>
