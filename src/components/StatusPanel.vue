<template>
	<div id="panelContainer">
		<div id="panelHeader">
			<button @click="$emit('close-panel')">
				<img src="@/assets/closeblack.svg" alt="close icon">
			</button>
		</div>
		<div id="panelBody">
			<h3 v-if="pendingActions.length > 0">Pending</h3>
			<ul>
				<li v-for="action in pendingActions">
					{{ action }}
				</li>
			</ul>
			<h3 v-if="completedActions.length > 0">Completed</h3>
			<ul>
				<li v-for="action in completedActions">
					{{ action }}
				</li>
			</ul>
		</div>
		<div id="panelFooter">
			<button id="disconnectButton" @click="disconnectRemote">Disconnect Remote</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StatusPanel',
	computed: {
		pendingActions() {
			return this.$store.state.actionQueue.map((action) => {
				switch (action.action.name) {
					case 'choose random':
						return 'choose a random student'
						break
					case 'save note':
						return `save a note about ${action.action.data.studentName}`
						break
					case 'disable random':
						return 'turn off student selector'
						break
				}
			})
		},
		completedActions() {
			return this.$store.state.completedActions.map((action) => {
				switch (action.action.name) {
					case 'choose random':
						return 'chose a random student'
						break
					case 'save note':
						return `saved a note about ${action.action.data.studentName}`
						break
					case 'disable random':
						return 'turned off student selector'
						break
				}
			})
		}
	},
	methods: {
		disconnectRemote() {
			this.$store.dispatch('resetStore')
			this.$router.push('/exit')
		}
	}
}
</script>

<style scoped>
#panelContainer {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	width: 250px;
	height: 100vh;
	background: var(--yellow);
	z-index: 2000;
	overflow: auto;
	box-shadow: -2px 0 7px var(--gray)
}

h3 {
	text-align: center;
}

ul {
	list-style: none;
	text-align: left;
	margin-bottom: 40px
}

li {
	margin: 20px 10px;
	padding: 10px;
	background: var(--light-gray);
}

img {
	height: 30px;
	padding: 10px 10px 0 0;
}

#disconnectButton {
	padding: 5px 10px;
	background: var(--red);
	color: var(--white);
	font-size: 18px;
	border-radius: 5px;
	cursor: pointer;
	outline: none;
	display: block;
	margin: 40px auto;
}
</style>
