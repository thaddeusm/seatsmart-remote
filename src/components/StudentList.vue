<template>
	<section ref="listContainer">
		<div id="searchArea" v-if="loaded">
			<input v-model="term" type="text" placeholder="search by first name" />
			<img v-if="term == ''" src="@/assets/search.svg" alt="search icon" id="searchIcon">
			<button v-else @click="clearSearchBox" id="clearSearchBoxButton"><img src="@/assets/close.svg" alt="close icon"></button>
		</div>
		<ul v-if="term == ''">
			<li v-for="(student, index) in students">
				<button :class="[student.absent ? 'absent' : '', 'student-button']" @click="selectStudent(index)">{{ student.firstName }} {{ student.lastName }}</button>
			</li>
		</ul>
		<ul v-else>
			<li v-for="(student, index) in filteredStudents">
				<button :class="[student.absent ? 'absent' : '', 'student-button']" @click="selectStudent(index)">{{ student.firstName }} {{ student.lastName }}</button>
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
			loaded: false
		}
	},
	computed: {
		students() {
			// add absent property to student list for UI
			let allStudents = this.$store.state.students
			
			for (let i=0; i<this.absentStudents.length; i++) {
				for (let k=0; k<allStudents.length; k++) {
					if (this.absentStudents[i] == allStudents[k]._id) {
						allStudents[k]['absent'] = true
					}
				}
			}

			return allStudents
		},
		absentStudents() {
			return this.$store.state.absentStudents
		},
		filteredStudents() {
			let unformattedTerm = this.term.toLowerCase().split(' ').join('')

			return this.students.filter((student) => {
				return student.firstName.toLowerCase().includes(unformattedTerm)
			})
		}
	},
	watch: {
		// load UI after store updates
		students(newValue, oldValue) {
			this.$emit('list-loaded')
			this.loaded = true
		}
	},
	methods: {
		selectStudent(studentIndex) {
			// todo: load note view with individual student preselected

			console.log(studentIndex)
		},
		clearSearchBox() {
			this.term = ''
			this.$refs.listContainer.focus()
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