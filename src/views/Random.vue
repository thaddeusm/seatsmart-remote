<template>
	<main>
		<StudentList  
			id="studentList" 
			v-on:student-chosen="routeToNote"
			:chosenStudents="selectedStudent"
		/>
		<StudentGrid 
			id="studentGrid" 
			v-on:student-chosen="routeToNote"
			:chosenStudents="selectedStudent"
		/>
		<ActionButtons>
			<template slot="left">
				<button class="action-button" @click="directToHome">
						<img src="@/assets/closeblack.svg" alt="close icon">
					</button>
			</template>
			<template slot="right">
				<button class="action-button" @click="incrementRandomStudent" :disabled="absentStudents.length == students.length || students.length - absentStudents.length < 2">
					<img src="@/assets/random.svg" alt="dice icon">
				</button>
			</template>
		</ActionButtons>
	</main>
</template>

<script>
import ActionButtons from '@/components/ActionButtons.vue'
import StudentList from '@/components/StudentList.vue'
import StudentGrid from '@/components/StudentGrid.vue'

export default {
	name: 'Random',
	components: {
		ActionButtons,
		StudentList,
		StudentGrid
	},
	computed: {
		randomStudent() {
			return this.$store.state.randomStudent
		},
		student() {
			if (this.randomStudent == 0) {
				return this.students[this.randomStudent]
			} else {
				return this.students[this.randomStudent - 1]
			}
		},
		room() {
			return this.$store.state.roomID
		},
		students() {
			return this.$store.state.students
		},
		absentStudents() {
			return this.$store.state.absentStudents
		},
		selectedStudent() {
			return [this.student._id]
		}
	},
	methods: {
		incrementRandomStudent() {
			this.$store.dispatch('incrementRandomStudent')
			this.sendRandomToHost()
		},
		sendRandomToHost() {
			let actionObj = {
				name: 'choose random',
				data: {
					randomStudent: this.randomStudent
				}
			}

			this.$store.dispatch('pushToActionQueue', actionObj)
		},
		disableRandom() {
			let actionObj = {
				name: 'disable random',
				data: {
					randomStudent: this.randomStudent
				}
			}

			this.$store.dispatch('pushToActionQueue', actionObj)
		},
		directToNote() {
			// disable random student UI on host
			this.disableRandom()

			this.$router.push(`/note/${this.student._id}`)
		},
		directToHome() {
			this.$store.dispatch('toggleRandomSelectorRunning')
			// disable random student UI on host
			this.disableRandom()
			this.$router.push(`/?room=${this.room}`)
		},
		shortName(firstName) {
			if (firstName.indexOf('(') !== -1) {
				return firstName.split('(')[1].split(')')[0].split(' ')[0]
			} else {
				return firstName
			}
		},
		routeToNote(student) {
			this.$store.dispatch('toggleRandomSelectorRunning')
			this.disableRandom()
			// when a student is selected, pass their id to add note view
			this.$router.push(`/note/${student._id}`)
		}
	},
	mounted() {
		this.$store.dispatch('toggleRandomSelectorRunning')
		this.incrementRandomStudent()
	}
}
</script>

<style scoped>
@media screen and (max-width: 800px) {
	#studentGrid {
		display: none;
	}
}

@media screen and (min-width: 801px) {
	#studentList {
		display: none;
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
