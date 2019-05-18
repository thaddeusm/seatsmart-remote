<template>
	<section>
		<div class="row" v-for="(row, index) in grid" :style="rowMargins">
            <div v-for="(student, subIndex) in row" :class="[student.chosen ? 'chosen' : '' ,'card-wrapper']" :key="subIndex">
                <button 
                	v-if="student._id !== 'blank'" 
                	:style="cardStyle"
                	:class="[student.absent ? 'absent' : '']" 
                	@click="chooseStudent(student, index, subIndex)"
                	:key="student._id + ' ' + numChosen"
                >
                		{{ student.firstName }} {{ student.lastName[0]}}.
                </button>
                <button class="blank-card" :style="cardStyle" v-else disabled></button>
            </div>
        </div>
	</section>
</template>

<script>
export default {
	name: 'StudentGrid',
	props: {
		chosenStudents: Array
	},
	data() {
		return {
			grid: [],
			cardStyle: {
				width: '',
				height: '',
				marginLeft: '',
				marginRight: '',
				fontSize: ''
			},
			rowMargins: {
				marginTop: '',
				marginBottom: ''
			},
			numChosen: 0
		}
	},
	computed: {
		students() {
			// add absent property to student list for UI
			let allStudents = this.$store.state.students
			
			for (let i=0; i<this.absentStudents.length; i++) {
				for (let k=0; k<allStudents.length; k++) {
					if (this.absentStudents[i] == allStudents[k]._id) {
						allStudents[k]['absent'] = true
					}
				}
			}

			return allStudents
		},
		absentStudents() {
			return this.$store.state.absentStudents
		},
		classInfo() {
			return this.$store.state.classInfo
		}
	},
	watch: {
		// wait to load UI until store updates
		students(newValue, oldValue) {
			if (newValue.length > 1) {
				this.buildGrid()
				this.calculateCardSize()

				// stop loader
				this.$emit('grid-loaded')
			}
		}
	},
	methods: {
		buildGrid() {
			this.grid = []

			for (let i=0; i<this.classInfo.rows; i++) {
				this.grid.push([])

				for (let k=0; k<this.classInfo.columns; k++) {
					this.grid[i].push({
	                    _id: 'blank',
	                    firstName: '',
	                    lastName: '',
	                    class: '',
	                    selected: '',
	                    seat: {
	                        row: 0,
	                        column: 0
	                    }
	                })
				}
			}

			for (let i=0; i<this.students.length; i++) {
	            let thisStudent = this.students[i]
	            let thisRow = thisStudent.seat.row
	            let thisColumn = thisStudent.seat.column

	            if (this.chosenStudents == undefined) {
	            	thisStudent.chosen = false
	            }

	            this.grid[thisRow - 1][thisColumn - 1] = thisStudent
	        }

	        // disable loader if students available to list
			if (this.students.length > 1) {
				this.$emit('grid-loaded')
			}
		},
		calculateCardSize() {
			// determine ideal card dimensions
			let totalWidth = window.innerWidth
			let totalHeight = window.innerHeight
			let heightAdjusted

			heightAdjusted = totalHeight * .84

			let totalCardWidth = totalWidth / this.classInfo.columns
			let totalCardHeight = heightAdjusted / this.classInfo.rows

			let ratio = totalCardWidth / totalCardHeight
			// enforce consistent dimensions
			if (ratio > 1.2) {
				totalCardWidth = totalCardHeight * 1.2
			} else if (ratio < 1.2) {
				totalCardHeight = totalCardWidth * .82
			}

			// determine ideal font size
			if (this.classInfo.columns < 6) {
				this.cardStyle.fontSize = '21px'
			} else if (this.classInfo.columns > 10) {
				this.cardStyle.fontSize = '13px'
			} else {
				this.cardStyle.fontSize = '16px'
			}

			// set sizes and margins
			let totalPossibleVerticalSpace = totalCardHeight * this.classInfo.rows
			let totalUsedVerticalSpace = totalPossibleVerticalSpace * .87
			let remainingVerticalSpace = heightAdjusted - totalUsedVerticalSpace
			let gaps = this.classInfo.rows + 2
			let verticalMargin = remainingVerticalSpace / gaps
			this.cardStyle.width = `${totalCardWidth * .9}px`
			this.cardStyle.marginRight = `${totalCardWidth * .04}px`
			this.cardStyle.marginLeft = `${totalCardWidth * .04}px`
			this.cardStyle.height = `${totalCardHeight * .7}px`
			this.rowMargins.marginTop = `${verticalMargin}px`
			this.rowMargins.marginBottom = `${verticalMargin}px`
		},
		chooseStudent(student, row, column) {
			this.numChosen++
			this.toggleHighlight(student, row, column)
			this.$emit('student-chosen', student)
		},
		toggleHighlight(student, row, column) {
			if (this.grid[row][column]['chosen'] == true) {
				this.grid[row][column]['chosen'] = false
			} else {
				this.grid[row][column]['chosen'] = true
			}
		}
	},
	mounted() {
		// check for screen size changes (device rotation)
		window.addEventListener('resize', () => {
			this.calculateCardSize()
		})

		this.calculateCardSize()
		this.buildGrid()

		// try to correct mobile keyboard tray distorted sizing
		let scope = this
		setTimeout(function() {
			scope.calculateCardSize()
			scope.buildGrid()
		}, 3000, scope)
	}
}
</script>

<style scoped>
section {
	padding-bottom: 80px;
}

.row {
    display: block;
    text-align: center;
}

.card-wrapper {
    display: inline-block;
}

.absent {
	opacity: .7;
}

.chosen > button {
	background: var(--yellow);
}

.blank-card {
	background: var(--gray);
	color: var(--black);
	border-radius: 10px;
	outline: none;
	cursor: not-allowed;
	display: inline-block;
	text-decoration: none;
	transition: .05s border ease;
}

button {
	background: var(--light-gray);
	color: var(--black);
	border-radius: 10px;
	outline: none;
	cursor: pointer;
	display: inline-grid;
	text-decoration: none;
	transition: .05s border ease;
	vertical-align: middle;
	justify-self: center;
	align-self: center;
}
</style>
