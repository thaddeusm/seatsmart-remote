<template>
	<aside>
        <button @click="openStatusPanel" id="statusPanelToggleButton">
            <img v-if="connected" src="@/assets/remoteconnect.svg" alt="remote icon">
            <img v-else src="@/assets/remotedisconnect.svg" alt="remote icon">
        </button>
        <transition name="slide">
            <StatusPanel v-if="showPanel" v-on:close-panel="closeStatusPanel" :connected="connected" />
        </transition>
	</aside>
</template>

<script>
import sjcl from 'sjcl'
import StatusPanel from '@/components/StatusPanel.vue'

export default {
	name: 'Status',
    components: {
        StatusPanel
    },
	data() {
		return {
			connected: false,
            showPanel: false
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
                    // dispatch actions to server when items are present in the queue
                    this.$socket.emit('initAction', this.encrypt(newValue[i]))
                }
            }
        },
        roomID(newValue, oldValue) {
            this.joinRoom()
        }
    },
    sockets: {
        roomJoined() {
            // update UI on connection and request data from desktop application (host)
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
            // detect and display host disconnection
            this.connected = false
        },
        sessionEnded() {
            // kick out client when host leaves / cancels connection
            this.$router.push('/exit')
        },
        confirmAction(id) {
            // when host application completes action, remove action from queue
            this.$store.dispatch('removeFromActionQueue', this.decrypt(id))
        }
    },
    methods: {
    	openStatusPanel() {
            this.showPanel = true

            document.body.style.overflowY = 'hidden'

            document.body.addEventListener('click', this.checkClickTarget)
        },
        closeStatusPanel() {
            this.showPanel = false

            document.body.style.overflowY = 'auto'

            document.body.removeEventListener('click', this.checkClickTarget)
        },
        checkClickTarget(event) {
            console.log(event.target)
            if (event.target.tagName !== "IMG" && event.target.parentNode.id !== "panelContainer" && event.target.id !== "panelContainer") {
                this.closeStatusPanel()
            }
        },
        joinRoom() {
            if (this.roomID !== undefined) {
                // use URL query to join secure channel (Socket room)
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

.slide-enter-active {
    animation-name: slideIn;
    animation-duration: .5s;
}

.slide-leave-active {
    animation-name: slideIn;
    animation-duration: .2s;
    animation-direction: reverse;
}

@keyframes slideIn {
    from {transform: translateX(250px);}
    to {transform: translateX(0px);}
}
</style>
