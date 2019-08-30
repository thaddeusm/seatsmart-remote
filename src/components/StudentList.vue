<template>
	<section ref="listContainer">
		<div id="searchArea" v-if="loaded">
			<input v-model="term" type="text" placeholder="search by first name" />
			<img v-if="term == ''" src="@/assets/search.svg" alt="search icon" id="searchIcon">
			<button v-else @click="clearSearchBox" id="clearSearchBoxButton"><img src="@/assets/closered.svg" alt="close icon"></button>
		</div>
		<ul>
			<li v-for="(student, index) in students" :class="[student.chosen ? 'chosen' : '']" :key="`student${index}${numChosen}`">
				<button 
					:class="[student.absent ? 'absent' : '', 'student-button']" 
					@click="chooseStudent(student)"
				>
					{{ shortName(student.firstName) }} {{ student.lastName }}
				</button>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'StudentList',
	data() {
		return {
			term: '',
			loaded: false,
			numChosen: 0
		}
	},
	props: {
		chosenStudents: Array
	},
	computed: {
		allStudents() {
			return this.$store.state.students	
		},
		absentStudents() {
			return this.$store.state.absentStudents
		},
		students() {
			// add absent property to student list for UI
			let allStudents = this.$store.state.students
			
			for (let i=0; i<this.absentStudents.length; i++) {
				for (let k=0; k<allStudents.length; k++) {
					if (this.absentStudents[i] == allStudents[k]._id) {
						allStudents[k]['absent'] = true
					}

					if (this.chosenStudents == undefined) {
						allStudents[k]['chosen'] = false
					}
				}
			}

			// filter students if search term provided
			if (this.term !== '') {
				let unformattedTerm = this.term.toLowerCase().split(' ').join('')

				let filteredList = allStudents.filter((student) => {
					return student.firstName.toLowerCase().includes(unformattedTerm)
				})

				return filteredList
			} else {
				return allStudents
			}
		},
	},
	watch: {
		// load UI after store updates
		allStudents(newValue, oldValue) {
			if (newValue.length > 0) {
				this.$emit('list-loaded')
				this.loaded = true
			}
		}
	},
	methods: {
		chooseStudent(student) {
			// react to student selection
			this.$emit('student-chosen', student)
			this.numChosen++
			this.toggleHighlight(student)
		},
		toggleHighlight(student) {
			for (let i=0; i<this.students.length; i++) {
				if (student._id == this.students[i]._id) {
					if (this.students[i]['chosen'] == true) {
						this.students[i]['chosen'] = false
					} else {
						this.students[i]['chosen'] = true
					}
				}
			}
		},
		clearSearchBox() {
			this.term = ''
			this.$refs.listContainer.focus()
		},
		shortName(firstName) {
			if (firstName.indexOf('(')) {
				return firstName.split('(')[1].split(')')[0].split(' ')[0]
			} else {
				return firstName
			}
		}
	},
	mounted() {
		if (this.allStudents.length > 0) {
			this.$emit('list-loaded')
			this.loaded = true
		}
	}
}
</script>

<style scoped>
ul {
	padding-bottom: 100px;
}

li {
	text-align: center;
}

.student-button {
	background: var(--light-gray);
	padding: 10px 20px;
	margin: 15px auto;
	color: var(--black);
	border-radius: 5px;
	outline: none;
	border: 3px solid var(--light-gray);
	cursor: pointer;
	width: 80%;
	font-size: 19px;
}

.absent {
	opacity: .7;
}

.chosen > button {
	background: var(--yellow);
}

#searchArea {
	text-align: center;
	margin-left: -10px;
}

#searchIcon {
	vertical-align: middle;
	width: 20px;
	margin-left: -30px;
}

#clearSearchBoxButton {
	outline: none;
	cursor: pointer;
	background: none;
	border: none;
	margin-left: -30px;
}

#clearSearchBoxButton > img {
	vertical-align: middle;
	width: 20px;
	margin-bottom: 3px;
}

input {
	border-radius: 4px;
	font-size: 19px;
	padding: 9px 10px 9px 10px;
	margin: 20px auto;
	width: 180px;
	color: var(--black);
	border: 2px solid var(--light-gray);
	outline: none;
	vertical-align: middle;
}
</style>
