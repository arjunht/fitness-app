import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchCalendarResults } from '../utils/api'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciFitnessCalendar from 'udacifitness-calendar'

class History extends Component {
	
	componentDidMount() {
		
		const { dispatch } = this.props
		
		fetchCalendarResults()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(({ entries }) => {
				if(!entries[timeToString()]) {
					dispatch(addEntry({
						[timeToString()]: getDailyReminderValue()
					}))
				}
			})
	}
	
	renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View>
			{today
				? <Text>{JSON.stringify(today)}</Text>
				: <Text>{JSON.stringify(metrics)}</Text>}
		</View>
	)
	
	renderEmptyDate(formattedDate) {
		return (
			<View>
				<Text>No Data for this day</Text>
			</View>
		)
	}
	
	renderEmptyDate = () => {
		
	}
	
	render() {
		const { entries } = this.props
		
		return (
			<UdaciFitnessCalendar
				items={entries}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
			/>
		)
	}
}

function mapStateToProps (entries) {
	return {
		entries
	}
}

export default connect(mapStateToProps)(History)