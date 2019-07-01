<template>
	<main>
		<h2>
			{{ instructions }}
		</h2>
		<section>
			<input 
				ref="first" 
				type="number" 
				min="0" 
				max="9" 
				required 
				v-model="first" 
				@keyup="moveInput('second')"
			>
			<input 
				ref="second" 
				type="number" 
				min="0" 
				max="9" 
				required 
				v-model="second" 
				@keyup="moveInput('third')"
			>
			<input 
				ref="third" 
				type="number" 
				min="0" 
				max="9" 
				required 
				v-model="third" 
				@keyup="moveInput('fourth')"
			>
			<input 
				ref="fourth" 
				type="number" 
				min="0" 
				max="9" 
				required 
				v-model="fourth"
				@keyup.enter="checkRoom" 
			>
			<button @click="checkRoom">Enter</button>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Code',
	data() {
		return {
			instructions: 'enter the 4-digit code',
			first: null,
			second: null,
			third: null,
			fourth: null
		}
	},
	methods: {
		checkRoom() {
			if (this.inputsComplete() == true) {
				let roomNumber = this.first + '' + this.second + '' + this.third + this.fourth

				this.$router.push(`/?room=${roomNumber}`)
			}
		},
		inputsComplete() {
			if (this.first !== null && this.second !== null && this.third !== null && this.fourth !== null) {
				return true
			} else {
				this.instructions = 'please try again'
				return false
			}
		},
		moveInput(input) {
			this.$refs[input].focus()
		}
	},
	mounted() {
		this.$refs['first'].focus()
	}
}
</script>

<style scoped>
h2 {
	color: var(--light-gray);
	margin: 20px auto 10px auto;
	display: block;
	vertical-align: middle;
	text-align: center;
}

button {
	padding: 5px 10px;
	background: var(--yellow);
	color: var(--black);
	font-size: 18px;
	border-radius: 5px;
	cursor: pointer;
	outline: none;
	display: block;
	margin: 20px auto;
}

section {
	text-align: center;
}

input {
	border-radius: 4px;
	font-size: 19px;
	padding: 9px 10px 9px 10px;
	margin: 20px 5px;
	width: 25px;
	color: var(--black);
	border: 2px solid var(--light-gray);
	outline: none;
	vertical-align: middle;
}
</style>