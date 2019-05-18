<template>
	<aside>
		<img v-if="connected" src="@/assets/remoteconnect.svg" alt="remote icon">
		<img v-else src="@/assets/remotedisconnect.svg" alt="remote icon">
	</aside>
</template>

<script>
import sjcl from 'sjcl'

export default {
	name: 'Status',
	data() {
		return {
			connected: false,
            panelOpen: false
		}
	},
    computed: {
        roomID() {
            return this.$store.state.roomID
        },
        actionQueue() {
            return this.$store.state.actionQueue
        }
    },
    watch: {
        actionQueue(newValue, oldValue) {
            if (newValue.length !== 0) {
                for (let i=0; i<newValue.length; i++) {
                    this.$socket.emit('initAction', this.encrypt(newValue[i]))
                }
            }
        }
    },
    sockets: {
        roomJoined() {
            console.log('joined the room:', this.roomID)
            this.connected = true
            this.$socket.emit('requestData')
        },
        incomingData(data) {
            // parse and dispatch data to store
            let parsedData = this.decrypt(data)

            this.$store.dispatch('setClassInfo', parsedData.classInfo)
            this.$store.dispatch('setStudents', parsedData.students)
            this.$store.dispatch('setAbsentStudents', parsedData.absentStudents)
            this.$store.dispatch('setRandomStudent', parsedData.randomStudent)
            this.$store.dispatch('setBehaviors', parsedData.behaviors)
        },
        rejoinedRoom() {
            // notify client that host has reconnected
            this.connected = true

            // request fresh data on rejoin
            this.$socket.emit('requestData')
        },
        disconnect() {
            // update UI on disconnection
            this.connected = false

            // attempt to rejoin room
            this.joinRoom()
        },
        deviceDisconnection() {
            // detect host disconnection
            console.log('host disconnected')

            this.connected = false
        },
        sessionEnded() {
            // kick out client when host leaves / cancels connection
            this.$router.push('/exit')
        },
        confirmAction(id) {
            this.$store.dispatch('removeFromActionQueue', this.decrypt(id))
        }
    },
    methods: {
    	togglePanel() {
            this.panelOpen = !this.togglePanel
    	},
        joinRoom() {
            if (this.roomID !== undefined) {
                this.$socket.emit('joinRoom', this.roomID)
            }
        },
        encrypt(data) {
            return sjcl.encrypt(this.roomID, JSON.stringify(data))
        },
        decrypt(data) {
            let decrypted = sjcl.decrypt(this.roomID, data)

            return JSON.parse(decrypted)
        }
    },
    mounted() {
        let scope = this

        // give time for state mutation to complete
        setTimeout(function() {
            scope.joinRoom()
        }, 2000, scope)
    }
}
</script>

<style scoped>
img {
	height: 30px;
}
</style>
