<template>
	<main>
		<header>
			<img src="@/assets/random.svg" alt="random icon" id="randomIcon">
		</header>
		<h1>
			{{ student.firstName }}
		</h1>
		<button id="closeButton" @click="directToHome">
			<img src="@/assets/closered.svg" alt="close icon">
		</button>
		<ActionButtons>
			<template slot="left">
				<button class="action-button" @click="directToNote">
					<img src="@/assets/note.svg" alt="note icon">
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

export default {
	name: 'Random',
	components: {
		ActionButtons
	},
	computed: {
		randomStudent() {
			return this.$store.state.randomStudent
		},
		student() {
			return this.students[this.randomStudent - 1]
		},
		room() {
			return this.$store.state.roomID
		},
		students() {
			return this.$store.state.students
		},
		absentStudents() {
			return this.$store.state.absentStudents
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
			// disable random student UI on host
			this.disableRandom()

			this.$router.push(`/?room=${this.room}`)
		}
	},
	mounted() {
		this.sendRandomToHost()
	}
}
</script>

<style scoped>
header {
	text-align: center;
	margin: 10px 0;
}

#randomIcon {
	background: var(--yellow);
	padding: 5px 7px;
	border-radius: 5px;
	vertical-align: middle;
	width: 1.1em;
}

#closeButton {
	cursor: pointer;
	outline: none;
	border: none;
	display: block;
	margin: 0 auto;
	background: none;
}

h1 {
	color: var(--white);
	margin: 70px 0;
	font-size: 3em;
	text-align: center;
}

.action-button {
	background: var(--yellow);
}

.action-button:disabled {
	cursor: not-allowed;
	opacity: .5;
}
</style>
