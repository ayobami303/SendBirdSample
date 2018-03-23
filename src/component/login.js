import React, {Component} from 'react'
import {Text, Platform, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import Sendbird from 'sendbird'

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			username:'',
			userID:'',
			error: ''
		}
		this._onPress = this._onPress.bind(this);
	}

	static navigationOptions = {
	    header: null
	  };

	_onPress(username){
		var sb = new Sendbird({
		    appId: 'A7A2672C-AD11-11E4-8DAA-0A18B21C2D82'
		});	    
		_self = this
	    sb.connect(username, function (user, error) {
	     if (error) {
	        _self.setState({	          
	          error: error
	        });
	        // console.log(error);
	        alert(error);
	        return;
	    }
	    if (Platform.OS === 'ios') {
	        // if (sb.getPendingAPNSToken()){
	        //   sb.registerAPNSPushTokenForCurrentUser(sb.getPendingAPNSToken(), function(result, error){
	        //     console.log("APNS TOKEN REGISTER AFTER LOGIN");
	        //     console.log(result);
	        //   });
	        // }
	    } else {
	      	// this.props.navigator.push({ name: 'channel' })
	      // alert(JSON.stringify(user))
	        if (sb.getPendingGCMToken()){
	          sb.registerGCMPushTokenForCurrentUser(sb.getPendingGCMToken(), function(result, error){
	            console.log("GCM TOKEN REGISTER AFTER LOGIN");
	            console.log(result);
	            // alert(result);
	            alert(result);
	          });
	        }
	    }

      	sb.updateCurrentUserInfo(username, '', function(response, error) {
        	if (error) {
        		_self.setState({error:error})
        	}else{
        		_self.setState({
		          userID: '',
		          username: '',
		          error: ''
		        },
		        () => _self.props.navigation.navigate('Channel')
		        );
		        alert('Success');
        	}
        	
      	});
	});


		// Sendbird.init({
		// 	app_id:'A7A2672C-AD11-11E4-8DAA-0A18B21C2D82',
		// 	guest_id: this.state.username,
		// 	user_name: this.state.username,
		// 	image_url: '',
		// 	access_token: '',
		// 	successFunc: (data) => {
		//     	console.log('success');
		// 		alert('success');
		//     },
		//     errorFunc: (status, error) => {
		//     	this.setState({username: ''});
		//     }
		// })
		// alert(text);
	}

	render() {
		return (
			<View style={styles.container}>
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
						onPress={() => this._onPress(this.state.username)}>
						<Text style={styles.label}>LOGIN</Text>						
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Login;

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
	}

})