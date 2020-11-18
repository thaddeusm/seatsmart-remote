<template>
	<div id="panelContainer">
		<div id="panelHeader">
			<h3>{{ connected ? 'Connected' : 'Reconnecting...' }}</h3>
			<button @click="$emit('close-panel')">
				<img id="close" src="@/assets/closeblack.svg" alt="close icon">
			</button>
		</div>
		<div id="panelBody">
			<h4 v-if="pendingActions.length > 0">Pending</h4>
			<ul>
				<li v-for="action in pendingActions">
					{{ action }}
					<Loader size="small" v-if="pendingActions.length > 0" />
				</li>
			</ul>
			<h4 v-if="completedActions.length > 0">Completed</h4>
			<ul>
				<li v-for="action in completedActions">
					{{ action }}
					<img id="check" src="@/assets/checkmark.svg" alt="checkmark">
				</li>
			</ul>
		</div>
		<div id="panelFooter">
			<button id="disconnectButton" @click="disconnectRemote">disconnect remote</button>
		</div>
	</div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
	name: 'StatusPanel',
	props: {
		connected: Boolean
	},
	components: {
		Loader
	},
	computed: {
		pendingActions() {
			return this.$store.state.actionQueue.filter((action) => {
				if (action.action.name == 'disable random') {
					return false
				} else {
					return true
				}
			}).map((action) => {
				switch (action.action.name) {
					case 'choose random':
						return 'choose a random student'
						break
					case 'save note':
						return `save a note about ${this.shortenName(action.action.data.studentName)}`
						break
					case 'launch activity':
						return `launched ${action.action.data.activity.activityType}`
						break
				}
			})
		},
		completedActions() {
			return this.$store.state.completedActions.filter((action) => {
				if (action.action.name == 'disable random') {
					return false
				} else {
					return true
				}
			}).map((action) => {
				switch (action.action.name) {
					case 'choose random':
						return 'chose a random student'
						break
					case 'save note':
						return `saved a note about ${this.shortenName(action.action.data.studentName)}`
						break
					case 'launch activity':
						return `launched ${action.action.data.activity.activityType}`
						break
					case 'cancel activity':
						return `canceled ${action.action.data.activity.activityType}`
						break
					case 'start activity':
						return `started ${action.action.data.activity.activityType}`
						break
				}
			})
		}
	},
	methods: {
		disconnectRemote() {
			this.$store.dispatch('resetStore')
			this.$router.push('/exit')
		},
		shortenName(name) {
			let formattedName = this.shortName(name)

			if (formattedName.length > 5) {
				return formattedName.slice(0, 5) + '...'
			} else {
				return formattedName
			}
		},
		shortName(firstName) {
			if (firstName.indexOf('(') !== -1) {
				return firstName.split('(')[1].split(')')[0].split(' ')[0]
			} else {
				return firstName
			}
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
	-webkit-overflow-scrolling: touch;
	box-shadow: -2px 0 7px var(--gray)
}

#panelHeader {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas: "status closeButton";
	align-items: center;
	padding: 10px;
}

#panelHeader > h3 {
	grid-area: status;
	text-align: left;
}

#panelHeader > button {
	grid-area: closeButton;
}

h4 {
	text-align: center;
	margin-top: 40px;
}

ul {
	list-style: none;
	text-align: left;
}

li {
	margin: 20px 10px;
	padding: 10px;
	font-size: 18px;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	background: var(--light-gray);
}

#close {
	height: 30px;
	vertical-align: middle;
}

#check {
	height: 14px;
}

#disconnectButton {
	padding: 5px 10px;
	background: var(--red);
	color: var(--white);
	font-size: 20px;
	border-radius: 5px;
	cursor: pointer;
	outline: none;
	display: block;
	margin: 60px auto 150px auto;
}
</style>
