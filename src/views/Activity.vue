<template>
	<main>
		<StudentList 
			id="studentList"
			:activity="true"
			:chosenStudents="connectedUsers"
			v-on:student-chosen="openStudentInfo"
		/>
		<StudentGrid 
			id="studentGrid"
			:activity="true" 
			:chosenStudents="connectedUsers"
			v-on:student-chosen="openStudentInfo"
		/>
		<ActionButtons>
			
		</ActionButtons>
	</main>
</template>

<script>
import StudentList from '@/components/StudentList.vue'
import StudentGrid from '@/components/StudentGrid.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
	name: 'Activity',
	components: {
		StudentList,
		StudentGrid,
		ActionButtons
	},
	data() {
		return {
			
		}
	},
	computed: {
		activityInProgress() {
			return this.$store.state.activityInProgress
		},
		connectedUsers() {
			if (this.activityInProgress !== null) {
				let connectedStudentNames = this.$store.state.activityInProgress.connectedUsers

				if (connectedStudentNames !== undefined) {
					let connectedStudents = []

					for (let i=0; i<connectedStudentNames.length; i++) {
						let connectedStudent = connectedStudentNames[i].split(' ')

						let name = {
							firstName: connectedStudent[0],
							lastName: connectedStudent[1]
						}

						for (let j=0; j<this.allStudents.length; j++) {
							if (this.allStudents[j].firstName.indexOf(name.firstName) !== -1 && this.allStudents[j].lastName.indexOf(name.lastName) !== -1) {
								connectedStudents.push(this.allStudents[j])
								break
							}
						}
					} 

					return connectedStudents

				} else {
					return []
				}
			} else {
				return []
			}
		},
		allStudents() {
			return this.$store.state.students
		}
	},
	watch: {
		activityInProgress(newValue, oldValue) {
			if (newValue == null) {
				this.$router.go(-1)
			}
		}
	},
	methods: {
		openStudentInfo(student) {

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
</style>
