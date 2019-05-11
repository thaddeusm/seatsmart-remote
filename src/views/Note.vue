<template>
	<main>
		<StudentList 
			id="studentList" 
			v-on:student-selected="toggleAddStudent"
			v-if="student == 'none'"
			:selectedStudents="students"
		/>
		<StudentGrid 
			id="studentGrid" 
			v-on:student-selected="toggleAddStudent"
			v-if="student == 'none'"
		/>
		<ActionButtons>
			<template slot="left">
				<button class="action-button" @click="$router.push(`/?room=${room}`)">
					<img src="@/assets/close.svg" alt="close icon">
				</button>
			</template>
			<template slot="right">
				<button class="action-button">
					<img src="@/assets/random.svg" alt="dice icon">
				</button>
			</template>
		</ActionButtons>
	</main>
</template>

<script>
import StudentList from '@/components/StudentList.vue'
import StudentGrid from '@/components/StudentGrid.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
	name: 'Note',
	components: {
		StudentList,
		StudentGrid,
		ActionButtons
	},
	props: {
		student: String
	},
	data() {
		return {
			students: [],
			state: ''
		}
	},
	computed: {
		room() {
			return this.$store.state.roomID
		}
	},
	methods: {
		toggleAddStudent(student) {
			let studentIndex = -1

			for (let i=0; i<this.students.length; i++) {
				if (this.students[i] == student) {
					studentIndex = i
					break
				}
			}

			if (studentIndex > -1) {
				this.students.splice(studentIndex, 1)
			} else {
				this.students.push(student)
			}

			console.log(this.students)
		}
	},
	mounted() {
		if (this.student == 'none') {
			this.state = 'select students'
		}
	}
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
	#studentGrid {
		display: none;
	}
}

@media screen and (min-width: 601px) {
	#studentList {
		display: none;
	}
}

.action-button {
	background: var(--light-gray)
}
</style>
