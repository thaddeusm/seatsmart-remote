<template>
	<main>
		<Loader id="loader" v-if="!loaded" />
		<StudentList 
			v-on:list-loaded="loaded = true" 
			id="studentList" 
			:randomStudent="randomStudent"
			v-on:student-chosen="routeToNote"
		/>
		<StudentGrid 
			v-on:grid-loaded="loaded = true" 
			id="studentGrid" 
			:randomStudent="randomStudent"
			v-on:student-chosen="routeToNote"
		/>
		<ActionButtons>
			<template slot="left">
				<button class="action-button" @click="$router.push('/note/none')">
					<img src="@/assets/note.svg" alt="note icon">
				</button>
			</template>
			<template slot="right">
				<button class="action-button" @click="$router.push('/random')" :disabled="absentStudents.length == students.length || students.length - absentStudents.length < 2">
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
		}
	},
	methods: {
		routeToNote(student) {
			this.$router.push(`/note/${student._id}`)
		}
	},
	mounted() {
		this.$store.dispatch('setRoomID', this.room)
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
		margin-top: 170px;
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
