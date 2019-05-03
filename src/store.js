import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    	roomID: '',
        classInfo: {
            name: null,
            columns: null,
            rows: null,
            _id: null,
            semester: null,
            year: null,
            archived: null
        },
        students: [],
        randomStudent: 0,
        behaviors: {
            positive: [],
            negative: []
        }
    },
    mutations: {
    	setRoomID(state, roomID) {
    		state.roomID = roomID
    	},
        setClassInfo(state, classInfo) {
            state.classInfo = classInfo
        },
        setStudents(state, students) {
            state.students = students
        },
        setRandomStudent(state, randomStudent) {
            state.randomStudent = randomStudent
        },
        setBehaviors(state, behaviors) {
            state.behaviors = behaviors
        }
    },
    actions: {
        setRoomID(context, roomID) {
        	context.commit('setRoomID', roomID)
        },
        setClassInfo(context, classInfo) {
            context.commit('setClassInfo', classInfo)
        },
        setStudents(context, students) {
            context.commit('setStudents', students)
        },
        setRandomStudent(context, randomStudent) {
            context.commit('setRandomStudent', randomStudent)
        },
        setBehaviors(context, behaviors) {
            context.commit('setBehaviors', behaviors)
        }
    }
})
