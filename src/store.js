import Vue from 'vue'
import Vuex from 'vuex'

import simpleId from 'simple-id'

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
        absentStudents: [],
        randomStudent: 0,
        behaviors: {
            positive: [],
            negative: []
        },
        actionQueue: []
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
        setAbsentStudents(state, absentStudents) {
            state.absentStudents = absentStudents
        },
        setRandomStudent(state, randomStudent) {
            state.randomStudent = randomStudent
        },
        incrementRandomStudent(state) {
            state.randomStudent++
        },
        setBehaviors(state, behaviors) {
            state.behaviors = behaviors
        },
        pushToActionQueue(state, action) {
            let newId = simpleId()

            state.actionQueue.push({
                id: newId,
                action: action
            })
        },
        removeFromActionQueue(state, actionId) {
            for (let i=0; i<state.actionQueue.length; i++) {
                if (state.actionQueue[i].id == actionId) {
                    state.actionQueue.splice(i, 1)
                    break;
                }
            }
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
        setAbsentStudents(context, absentStudents) {
            context.commit('setAbsentStudents', absentStudents)
        },
        setRandomStudent(context, randomStudent) {
            context.commit('setRandomStudent', randomStudent)
        },
        incrementRandomStudent(context) {
            context.commit('incrementRandomStudent')
        },
        setBehaviors(context, behaviors) {
            context.commit('setBehaviors', behaviors)
        },
        pushToActionQueue(context, action) {
            context.commit('pushToActionQueue', action)
        },
        removeFromActionQueue(context, actionId) {
            context.commit('removeFromActionQueue', actionId)
        }
    }
})
