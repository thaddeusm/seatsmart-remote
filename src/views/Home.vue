<template>
	<main>
		<StudentList id="studentList" />
		<StudentGrid id="studentGrid" />
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
import StudentList from '@/components/StudentList.vue'
import StudentGrid from '@/components/StudentGrid.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
	name: 'home',
	props: {
		room: String
	},
	components: {
		StudentList,
		StudentGrid,
		ActionButtons
	},
	data() {
		return {
			
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
}

@media screen and (min-width: 601px) {
	#studentList {
		display: none;
	}
}


h1 {
	color: var(--yellow);
}
</style>