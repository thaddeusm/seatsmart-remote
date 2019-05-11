<template>
	<section ref="listContainer">
		<div id="searchArea" v-if="loaded">
			<input v-model="term" type="text" placeholder="search by first name" />
			<img v-if="term == ''" src="@/assets/search.svg" alt="search icon" id="searchIcon">
			<button v-else @click="clearSearchBox" id="clearSearchBoxButton"><img src="@/assets/close.svg" alt="close icon"></button>
		</div>
		<ul>
			<li v-for="(student, index) in students">
				<button 
					:class="[student.absent ? 'absent' : '', student.selected ? 'selected' : '', 'student-button']" 
					@click="selectStudent(student)"
				>
					{{ student.firstName }} {{ student.lastName }}
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
			students: []
		}
	},
	props: {
		selectedStudents: Array
	},
	computed: {
		allStudents() {
			return this.$store.state.students	
		},
		absentStudents() {
			return this.$store.state.absentStudents
		}
	},
	watch: {
		// load UI after store updates
		allStudents(newValue, oldValue) {
			if (newValue.length > 0) {
				this.$emit('list-loaded')
				this.loaded = true
				this.filterStudents()
			}
		},
		term(newValue, oldValue) {
			this.filterStudents()
		}
	},
	methods: {
		selectStudent(student) {
			this.$emit('student-selected', student)
			
			for (let i=0; i<this.students.length; i++) {
				if (student._id == this.students[i]._id) {
					if (this.students[i]['selected']) {
						this.students[i]['selected'] = false
					} else {
						this.students[i]['selected'] = true
					}
				}
			}
		},
		deselectAllStudents() {
			for (let i=0; i<this.students.length; i++) {
				this.students[i]['selected'] = false
			}
		},
		addAbsences() {
			for (let i=0; i<this.absentStudents.length; i++) {
				for (let k=0; k<this.students.length; k++) {
					if (this.absentStudents[i] == this.students[k]._id) {
						this.students[k]['absent'] = true
					}
				}
			}
		},
		clearSearchBox() {
			this.term = ''
			this.$refs.listContainer.focus()
		},
		filterStudents() {
			this.students = this.allStudents

			this.addAbsences()

			if (this.term !== '') {
				let unformattedTerm = this.term.toLowerCase().split(' ').join('')

				let filteredList = this.students.filter((student) => {
					return student.firstName.toLowerCase().includes(unformattedTerm)
				})

				this.students = filteredList
			}
		}
	},
	mounted() {
		if (this.allStudents.length > 0) {
			this.$emit('list-loaded')
			this.loaded = true
			this.filterStudents()
			this.deselectAllStudents()
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

.selected {
	background: var(--yellow);
}

#searchArea {
	text-align: center;
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
	padding: 7px 10px 9px 10px;
	margin: 20px auto;
	width: 180px;
	color: var(--black);
	border: 2px solid var(--light-gray);
	outline: none;
	vertical-align: middle;
}
</style>
