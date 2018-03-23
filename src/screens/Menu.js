import React, {Component} from 'react'
import {Text, Platform, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { initMenu, sendbirdLogout } from '../actions'
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Sendbird from 'sendbird'

class Menu extends Component{
	constructor(props){
		super(props);
		this._onDisconnectButtonPress = this._onDisconnectButtonPress.bind(this);
		this._onProfileButtonPress = this._onProfileButtonPress.bind(this);
	}

	static navigationOptions = {
	    title: 'Menu' 
	};

	componentWillMount(){
		this.props.initMenu();
	}
 
	componentWillReceiveProps(props){
		const {isDisconnected} = props;
		if(isDisconnected){
			alert("Disconnected");
			const resetAction = NavigationActions.reset({
				index:0,
				actions:[
					NavigationActions.navigate({routeName: 'Login'})
				]
			})

			this.setState({isLoading: false}, () => this.props.navigation.dispatch(resetAction))
		}
	}

	_onProfileButtonPress(){
		this.props.navigation.navigate('Profile')
	}

	_onOpenChannelPress = () => {
		this.props.navigation.navigate('OpenChannel')
	}

	_onGroupChannelPress(){

	}

	_onDisconnectButtonPress(){
		this.props.sendbirdLogout();
	}

	render() {
		return (
			<View style={styles.container}>		
				<TouchableOpacity
					style={styles.button}
					onPress={this._onProfileButtonPress}>
					<View>
						
						<Text style={styles.label}>Profile</Text>
					</View>
				</TouchableOpacity> 
				<TouchableOpacity 
					style={styles.button}
					onPress={this._onOpenChannelPress}>
					<Text style={styles.label}>Open Channel</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.button}
					onPress={this._onGroupChannelPress}>
					<Text style={styles.label}>Group Channel</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.button}
					onPress={this._onDisconnectButtonPress}>
					<Text style={styles.label}>Disconnect</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

function mapStateToProps({menu}) {
	const {isDisconnected} = menu;
	return {isDisconnected}; 
} 
export default connect(mapStateToProps, { sendbirdLogout, initMenu })(Menu);

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection: 'column',		
		alignItems: 'stretch',
		backgroundColor:'#fff'
	},
	button:{
		justifyContent: 'center',
		width:300,
		width:300,	
		marginTop:10,
		padding: 10,
		backgroundColor: '#fff'
	},
	label:{
		width:230,
		fontSize: 20,
		fontWeight: '600',
		color: '#6e5baa'
	}
})