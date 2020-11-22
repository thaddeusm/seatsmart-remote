<template>
	<main>
		<header v-if="state !== 'choose students'">
			<h2>{{ state }}</h2>
		</header>
		<section v-if="state == 'choose students'">
			<StudentList 
				id="studentList" 
				v-on:student-chosen="toggleAddStudent"
				v-if="student == 'none'"
				:chosenStudents="studentIds"
			/>
			<StudentGrid 
				id="studentGrid" 
				v-on:student-chosen="toggleAddStudent"
				v-if="student == 'none'"
				:chosenStudents="studentIds"
			/>
			<ActionButtons>
				<template slot="left">
					<button class="action-button" @click="routeBack">
						<img src="@/assets/closeblack.svg" alt="close icon">
					</button>
				</template>
				<template slot="right">
					<button class="action-button" @click="displayBehaviorSelection">
						<img src="@/assets/next.svg" alt="next icon">
					</button>
				</template>
			</ActionButtons>
		</section>
		<section v-else>
			<section class="behavior-selection-area" v-if="chosenBehavior.Abbreviation == ''">
				<ul class="carousel-list">
					<li v-for="positiveBehavior in behaviors.positive">
						<button class="carousel-button positive" @click="setBehavior(positiveBehavior, 'positive')">
							{{ positiveBehavior.Abbreviation }}
						</button>
					</li>
				</ul>
				<ul class="carousel-list">
					<li v-for="negativeBehavior in behaviors.negative">
						<button class="carousel-button negative" @click="setBehavior(negativeBehavior, 'negative')">
							{{ negativeBehavior.Abbreviation }}
						</button>
					</li>
				</ul>
			</section>
			<section class="behavior-area" v-else>
				<h5 :class="[chosenBehavior.Type]">
					{{ chosenBehavior.Description }}
				</h5>
				<button class="cancel-button" @click="resetBehavior"><img src="@/assets/closered.svg" alt="close icon"></button>
				<textarea v-model="note" placeholder="Your note (optional)..."></textarea>
			</section>
			<ActionButtons>
				<template slot="left">
					<button class="action-button" @click="routeBack">
						<img src="@/assets/closeblack.svg" alt="close icon">
					</button>
				</template>
				<template slot="right">
					<button class="action-button" @click="saveNote" :disabled="chosenBehavior.Description == ''">
						<img src="@/assets/checkhexagon.svg" alt="check icon">
					</button>
				</template>
			</ActionButtons>
		</section>
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
			studentIds: [],
			state: '',
			chosenBehavior: {
				Abbreviation: '',
				Type: '',
				Description: '',
				Weight: ''
			},
			note: ''
		}
	},
	computed: {
		room() {
			return this.$store.state.roomID
		},
		behaviors() {
			return this.$store.state.behaviors
		},
		allStudents() {
			return this.$store.state.students
		}
	},
	methods: {
		toggleAddStudent(student) {
			// add/remove selected students for new notes
			let studentIndex = -1

			for (let i=0; i<this.students.length; i++) {
				if (this.students[i] == student) {
					studentIndex = i
					break
				}
			}

			if (studentIndex > -1) {
				this.students.splice(studentIndex, 1)
				this.studentIds.splice(studentIndex, 1)
			} else {
				this.students.push(student)
				this.studentIds.push(student._id)
			}
		},
		routeBack() {
			// decide what "back" means
			if (this.student == 'none' && this.state == 'enter note') {
				this.state = 'choose students'
			} else {
				this.$router.push(`/?room=${this.room}`)
			}
		},
		displayBehaviorSelection() {
			if (this.students.length > 0) {
				this.state = 'select a behavior'
			}
		},
		setBehavior(behavior, type) {
			let obj = {
				Abbreviation: behavior.Abbreviation,
				Type: type,
				Description: behavior.Description,
				Weight: behavior.Weight
			}

			this.chosenBehavior = obj

			// provide UI feedback about students to receive a note note
			if (this.student !== "none") {
				this.state = `enter a note about ${this.findStudentName(this.student)}`
			} else {
				if (this.students.length > 1) {
					this.state = `enter a note about ${this.students.length} students`
				} else {
					this.state = `enter a note about 1 student`
				}
			}
			
		},
		resetBehavior() {
			this.chosenBehavior = {
				Abbreviation: '',
				Type: '',
				Description: '',
				Weight: ''
			}

			this.state = 'select a behavior'
		},
		findStudentName(id) {
			for (let i=0; i<this.allStudents.length; i++) {
				if (this.allStudents[i]._id == id) {
					return this.shortName(this.allStudents[i].firstName)
					break
				}
			}
		},
		saveNote() {
			let actionObj = {}
			// loop through selected students
			if (this.student == 'none') {
				for (let i=0; i<this.students.length; i++) {
					actionObj = {
						name: 'save note',
						data: {
							behavior: this.chosenBehavior,
							note: this.note,
							student: this.students[i]._id,
							studentName: this.students[i].firstName
						}
					}

					this.$store.dispatch('pushToActionQueue', actionObj)
				}
			// or save note for one student
			} else {
				// get the student's first name
				let firstName
				for (let i=0; i<this.allStudents.length; i++) {
					if (this.allStudents[i]._id == this.student) {
						firstName = this.allStudents[i].firstName
						break
					}
				}

				actionObj = {
					name: 'save note',
					data: {
						behavior: this.chosenBehavior,
						note: this.note,
						student: this.student,
						studentName: firstName
					}
				}
				this.$store.dispatch('pushToActionQueue', actionObj)
			}
			this.$router.push(`/?room=${this.room}`)
		},
		shortName(firstName) {
			if (firstName.indexOf('(') !== -1) {
				return firstName.split('(')[1].split(')')[0].split(' ')[0]
			} else {
				return firstName
			}
		}
	},
	mounted() {
		if (this.student == 'none') {
			this.state = 'choose students'
		} else {
			this.state = 'select a behavior'
		}
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

header {
	text-align: center;
	margin: 10px 0;
}

h2 {
	color: var(--light-gray);
	margin: 20px auto 10px auto;
	display: inline-block;
	vertical-align: middle;
}

h5 {
	text-align: center;
	padding: 10px;
	vertical-align: middle;
	max-width: 416px;
	margin: 0 auto;
}

.cancel-button {
	background: var(--white);
	cursor: pointer;
	outline: none;
	border: none;
	width: 25px;
	height: 25px;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	vertical-align: middle;
}

.cancel-button > img {
	vertical-align: middle;
	height: 14px;
}

textarea {
	display: block;
	margin: 20px auto;
	width: 70%;
	max-width: 400px;
	height: 140px;
	padding: 15px;
	font-size: 19px;
	border: 1px solid var(--gray);
	outline: none;
}

.action-button {
	background: var(--yellow)
}

.action-button:disabled {
	cursor: not-allowed;
	opacity: .5;
}

.behavior-area {
	 text-align: center;
	 margin: 20px 0;
}

.carousel-list {
	text-align: center;
}

.carousel-list > li {
	display: inline-block;
	margin: 10px;
}

.carousel-button {
	width: 2em;
	height: 2em;
	cursor: pointer;
	font-size: 1em;
	border-radius: 2em;
}

.positive {
	background: var(--yellow);
}

.negative {
	background: var(--red);
	color: var(--white);
}
</style>
