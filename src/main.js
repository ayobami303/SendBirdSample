import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Login from './component/login.js'
import Channel from './component/channel.js'

class Main extends Component{
	 ROUTES = {
		login:Login,
		channel:Channel
	}

	render() {
		return (
			<View style={styles.container}><Login/></View>
		);
	}
}

export default Main;

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor:'#6E5BAA'
	}
})