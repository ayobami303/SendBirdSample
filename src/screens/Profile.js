import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Text, Image, Platform, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { initProfile, updateProfile, getCurrentUserInfo } from '../actions'


class Profile extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			profileUrl:'',
			nickname: ''
		}

		this._onNicknameChanged = this._onNicknameChanged.bind(this);
		this._onSaveButtonPress = this._onSaveButtonPress.bind(this);
	}

	/*static navigationOptions = {
	    title: 'Menu',
	    headerRight:(
				<TouchableOpacity 
					
					onPress = {() => params.handleSave()}>
					<Text> Save</Text>
				</TouchableOpacity>
			) 
	};*/
	static navigationOptions = ({navigation}) => {
		const { params } = navigation.state;
		return {
			title: 'Profile',
			headerRight:(
				<TouchableOpacity 
					style = {styles.button}
					onPress = {() => params.handleSave()}>
					<Text style = {{color:'#7d62d9', fontSize:20, fontWeight:'600'}}>Save</Text>
				</TouchableOpacity>
			)
		}
	}

	getDerivedStateFromProps = () =>{

	}

	componentDidMount(){
		this.props.navigation.setParams({handleSave:this._onSaveButtonPress})
		this.props.initProfile();
		this.props.getCurrentUserInfo();
	}

	componentWillReceiveProps(props){
		const { userInfo, isSaved} = props;
		if(userInfo){
			const { profileUrl, nickname } = userInfo;
			this.setState({ profileUrl, nickname });
		}

		if (isSaved) {
			this.props.navigation.goBack();
		}
	}

	_onSaveButtonPress(){
		this.props.updateProfile(this.state.nickname);
	}

	_onNicknameChanged(text){
		this.setState({
			nickname: text
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Image source = {{uri:this.state.profileUrl}} style={styles.image}/>
				<Text style={styles.nickname}>Nickname </Text>
				<TextInput 
				style = {styles.input}
					value = {this.state.nickname}
					placeHolder = {'Change nickname'}
					onChangeText ={(text) => this.setState({nickname: text})} 
					maxlength={12}/>
			</View>
		);
	}
}


function mapStateToProps({profile}) {
	const {userInfo, error, isSaved} = profile;
	return {userInfo, error, isSaved}; 
} 
export default connect(mapStateToProps, { initProfile, getCurrentUserInfo, updateProfile })(Profile);

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection: 'column',		
		alignItems: 'stretch',
		backgroundColor:'#fff',
		padding: 10,
	},
	button:{			
		padding: 20,
		backgroundColor: '#fff'
	},
	label:{
		width:230,
		fontSize: 20,
		fontWeight: '600',
		color: '#6e5baa'
	},
	nickname:{
		marginTop: 20,

	},
	input:{
		marginTop: 5,
		height:40,
		padding:8,
		borderColor: '#E7E7E7',
		borderWidth: 1
	},
	image:{
		alignSelf: 'center',
		marginTop: 70,
		width: 100, 
		height: 100,
		borderRadius: 50,
	}
})