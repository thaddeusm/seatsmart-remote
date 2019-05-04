<template>
	<section>
		<div id="searchArea" v-if="loaded">
			<input v-model="term" type="text" placeholder="search by first name" />
			<img src="@/assets/search.svg" alt="search icon" id="searchIcon">
		</div>
		<ul v-if="term == ''">
			<li v-for="(student, index) in students">
				<button @click="selectStudent(index)">{{ student.firstName }} {{ student.lastName }}</button>
			</li>
		</ul>
		<ul v-else>
			<li v-for="(student, index) in filteredStudents">
				<button @click="selectStudent(index)">{{ student.firstName }} {{ student.lastName }}</button>
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
			return this.$store.state.students
		},
		filteredStudents() {
			let unformattedTerm = this.term.toLowerCase().split(' ').join('')

			return this.students.filter((student) => {
				return student.firstName.toLowerCase().includes(unformattedTerm)
			})
		}
	},
	watch: {
		students(newValue, oldValue) {
			this.$emit('list-loaded')
			this.loaded = true
		}
	},
	methods: {
		selectStudent(studentIndex) {
			console.log(studentIndex)
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

button {
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

#searchArea {
	text-align: center;
}

#searchIcon {
	vertical-align: middle;
	margin-left: -30px;
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