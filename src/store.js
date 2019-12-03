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
        actionQueue: [],
        completedActions: [],
        activities: [],
        activityInProgress: null,
        displayActivityPanel: false,
        randomSelectorRunning: false
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
            if (!state.randomSelectorRunning) {
                state.randomStudent = randomStudent
            }
        },
        incrementRandomStudent(state) {
            state.randomStudent++
        },
        setBehaviors(state, behaviors) {
            state.behaviors = behaviors
        },
        setActivities(state, activities) {
            state.activities = activities
        },
        setActivityInProgress(state, activity) {
            state.activityInProgress = activity
        },
        pushToActionQueue(state, action) {
            let newId = simpleId()

            state.actionQueue.push({
                id: newId,
                action: action
            })
        },
        removeFromActionQueue(state, actionId) {
            let action

            for (let i=0; i<state.actionQueue.length; i++) {
                if (state.actionQueue[i].id == actionId) {
                    if (state.actionQueue[i].action.name == 'launch activity') {
                        state.activityInProgress = state.actionQueue[i].action.data.activity
                    }

                    action = state.actionQueue.splice(i, 1)
                    break
                }
            }
            
            state.completedActions.push(action[0])
        },
        clearActionQueue(state) {
            state.actionQueue = []
        },
        clearCompletedActions(state) {
            state.completedActions = []
        },
        toggleActivityPanel(state) {
            state.displayActivityPanel = !state.displayActivityPanel
        },
        toggleRandomSelectorRunning(state) {
            state.randomSelectorRunning = !state.randomSelectorRunning
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
        setActivities(context, activities) {
            context.commit('setActivities', activities)
        },
        setActivityInProgress(context, activity) {
            context.commit('setActivityInProgress', activity)
        },
        pushToActionQueue(context, action) {
            context.commit('pushToActionQueue', action)
        },
        removeFromActionQueue(context, actionId) {
            context.commit('removeFromActionQueue', actionId)
        },
        resetStore(context) {
            context.commit('setRoomID', '')
            context.commit('setClassInfo', {
                name: null,
                columns: null,
                rows: null,
                _id: null,
                semester: null,
                year: null,
                archived: null
            })
            context.commit('setStudents', [])
            context.commit('setAbsentStudents', [])
            context.commit('setRandomStudent', 0)
            context.commit('setBehaviors', {
                positive: [],
                negative: []
            })
            context.commit('clearActionQueue')
            context.commit('clearCompletedActions')
        },
        toggleActivityPanel(context) {
            context.commit('toggleActivityPanel')
        },
        toggleRandomSelectorRunning(context) {
            context.commit('toggleRandomSelectorRunning')
        }
    }
})
