import React, {Component} from 'react'
import {Text, Platform, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import Sendbird from 'sendbird'

class Channel extends Component{
	render() {
		return (
			<View style={styles.container}><Text></Text></View>
		);
	}
}

export default Channel;

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor:'#6E5BAA'
	}
})