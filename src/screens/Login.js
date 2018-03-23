import React, {Component} from 'react';
import {Text, Platform, View, Modal, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { sendbirdLogin } from '../actions';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			userID:'',			
			username:'',
			animating: false

		}

		this._onPress = this._onPress.bind(this);
	}

	componentWillReceiveProps(props){
		const { user, error } = props;
		if(user){
			const resetAction = NavigationActions.reset({
				index: 0,
				actions:[
					NavigationActions.navigate({ routeName: 'Menu'})
				]
			})
			this.setState({
				userID: '',
				username: ''
			}, () => {this.props.navigation.dispatch(resetAction)})
		}
	}

	static navigationOptions = {
	    header: null
	};

	_onPress = () => {
		this.setState({animating:true})

		userID = this.state.userID
		username = this.state.username
		this.props.sendbirdLogin({ userID, username });
		
	}
	
	closeActivityIndicator = () => {setTimeout(() => this.setState({animating:false}), 6000)}

	render() {
		const animating = this.state.animating;

		return (
			<View style={styles.container}>
				<Modal
				  	transparent={true}
				  	animationType={'none'}
					onRequestClose={() => {console.log('close modal')}}
				  	visible={animating}>
				 	<View style={styles.modalBackground}>
				   		<View style = { styles.actWrapper} >
				      		<ActivityIndicator
				        		animating={animating}
				        		color = '#efbf56'
								size = "large"
								style = {styles.activityIndicator}  />
				    	</View>
				  	</View>
				</Modal>

				<View style={styles.loginContainer} >
					<TextInput 
						underlineColorAndroid = 'transparent'
						style={styles.input} 
						value={this.state.userID} 
						onChangeText={(text) => this.setState({userID:text}) } 
						placeholder = 'Enter User ID' 
						maxLength ={12}
						multiline={false} />

					<TextInput 
						underlineColorAndroid = 'transparent'
						style={styles.input} 
						value={this.state.username} 
						onChangeText={(text) => this.setState({username:text}) } 
						placeholder = 'Enter Nickname' 
						maxLength ={12}
						multiline={false} />

					<TouchableOpacity
						style={styles.button}
						onPress={this._onPress}>
						<Text style={styles.label}>LOGIN</Text>						
					</TouchableOpacity>
				</View>				
			</View>
		);
	}
}

function mapStateToProps({ login }) {
	const { error, user } = login;
	return { error, user };
}

// function mapStateToProps({ login }) {
//     const { error, user } = login;
//     return { error, user };
// };

export default connect(mapStateToProps, { sendbirdLogin })(Login);
// export default connect(mapStateToProps,{ sendbirdLogin })(Login);



const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor:'#6E5BAA'
	},
	loginContainer:{
		padding:20,	
		justifyContent: 'center',
		alignItems: 'stretch',
		flex:1	
	},
	input:{
		color:'#555',
		width:300,
		height:50,
		marginTop:10,
		borderWidth: 1,
		borderColor: '#32C5E6',
		borderRadius:4,
		padding: 10,
		alignSelf: 'center',
		backgroundColor:'white',
	},
	button:{
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		width:300,
		width:300,
		borderWidth: 1,
		marginTop:10,
		padding: 10,
		borderColor:'#328FE6',
		borderRadius: 5,
		backgroundColor: '#32c5e6'
	},
	label:{
		width:230,
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600',
		color: '#fff'
	},
	modalBackground:{
		 
		flex: 1,
	    alignItems: 'center',
	    flexDirection: 'column',
	    justifyContent: 'space-around',
	    backgroundColor: '#00000040'
	},
	actWrapper:{
		backgroundColor: '#FFFFFF',
	    height: 100,
	    width: 100,
	},
	activityIndicator:{
		flex: 1,
      	justifyContent: 'center',
      	alignItems: 'center',
      	height: 80
	}

})