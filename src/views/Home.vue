<template>
	<main>
		<Loader id="loader" v-if="!loaded" />
		<StudentList 
			v-on:list-loaded="loaded = true" 
			id="studentList" 
			:randomStudent="randomStudent"
		/>
		<StudentGrid 
			v-on:grid-loaded="loaded = true" 
			id="studentGrid" 
			:randomStudent="randomStudent"
		/>
		<ActionButtons>
			<template slot="left">
				<button>
					<img src="@/assets/note.svg" alt="note icon">
				</button>
			</template>
			<template slot="right">
				<button>
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
		}
	},
	mounted() {
		this.$store.dispatch('setRoomID', this.room)
	}
}
</script>


<style scoped>
@media screen and (max-width: 600px) {
	#studentGrid {
		display: none;
	}

	#loader {
		margin-top: 100px;
	}
}

@media screen and (min-width: 601px) {
	#studentList {
		display: none;
	}

	#loader {
		margin-top: 170px;
	}
}


h1 {
	color: var(--yellow);
}
</style>