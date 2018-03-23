import React, { Component } from 'react'
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList} from 'react-native'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { getOpenChannelList } from '../actions'
import { sbCreateOpenChannelListQuery } from '../sendbirdActions'

class OpenChannel extends Component{
	constructor(props){
		super(props);
		this.state={
			refresh: false,
			openChannelListQuery: null,
			list: [],
			openChannelList:  null,
			FlatListItems: [
		      {key: 'One'},
		      {key: 'Two'},
		      {key: 'Three'},
		      {key: 'Four'},
		      {key: 'Five'},
		      {key: 'Six'},
		      {key: 'Seven'},
		      {key: 'Eight'},
		      {key: 'Nine'},
		      {key: 'Ten'},
		      {key: 'Eleven'},
		      {key: 'Twelve'}
		    ]
		}
	}

	static navigationOptions = {
		title: 'Open Channel'
	}

	componentDidMount (){
		this._initOpenChannelList();
	}

	FlatListItemSeparator = () => {
	    return (
	      <View
	        style={{
	          height: 1,
	          width: "100%",
	          backgroundColor: "#607D8B",
	        }}
	      />
	    );
	}
	
	componentWillReceiveProps(props){
		const { list } = props;

		if(list !== this.props.list){
			if (list.length === 0) {
				this.setState({
					list: [],
					openChannelList: null
				})
			}else{
				const newList = [...this.state.list, ...list]
				this.setState({
					list: newList,
					openChannelList: newList
				})
			}
		}else{
		}
	}

	_initOpenChannelList = () =>{
		this._getOpenChannelList(true);
	}

	_getOpenChannelList = (init) =>{
		if (init) {
			const openChannelListQuery = sbCreateOpenChannelListQuery();
			this.setState({openChannelListQuery}, () => {this.props.getOpenChannelList(this.state.openChannelListQuery)})
		} else {
			this.props.getOpenChannelList(this.state.openChannelListQuery);
		}
	}

	_onListItemPress = (channelUrl) => {
		// todo
	}

	_handleScroll = (e) =>{
		if(e.nativeEvent.contentOffset.y < -100 && !this.state.refresh){
			this.setState({ list: [], openChannelList: ds.cloneWithRows([]), refresh:this._initOpenChannelList() })
		}
	}

	_renderList = (rowData) => {
		return(
			<ListItem
				component = {TouchableHighlight}
				containerStyle = {{backgroundColor: '#fff'}}
				avatar = {(
					<Avatar source = {{uri: rowData.coverUrl}} />
				)}
				title = {rowData.name.length > 30 ? rowData.name.substring(0, 26) + '...' : rowData.name }
				titleStyle ={{fontWeight: '500', fontSize: 16}}
				onPress = { () => this._onListItemPress(rowData.url)}
				/>
		)
	}

	_renderItem = (rowData) => {
		return(
			<TouchableOpacity style = {{backgroundColor:'#000'}}
				// title = {rowData.name.length > 30 ? rowData.name.substring(0, 26) + '...' : rowData.name }
				// titleStyle ={{fontWeight: '500', fontSize: 16}}
				onPress = { () => this._onListItemPress(rowData.url)}>
				<Text>this </Text>
			</TouchableOpacity>

		)
	}


	render() {
		return (
			<View>				
				<FlatList
       
		          	data={ this.state.openChannelList }
		          	ItemSeparatorComponent = {this.FlatListItemSeparator}
		          	renderItem={({item:rowData}) => 
		          		<View style={styles.listItem}>
                			<View style={styles.imageWrapper}>
                  				<Image style={{ width: 50, height: 50 }} 
                  					source={{uri: rowData.coverUrl === '' || rowData.coverUrl === null ? 'https://via.placeholder.com/70x70.jpg' : rowData.coverUrl,}} />
                  			</View>
                  			<View >
		          				<Text style ={styles.textWrapper}> {rowData.name} </Text>
		          			</View>
		          		</View>
		          	}
		        />
			</View>
		);
	}
}

function mapStateToProps({openChannel}) {
	const { list } = openChannel;
	return { list };
}

export default connect(mapStateToProps, { getOpenChannelList })(OpenChannel);

const styles = StyleSheet.create({
	listItem:{
		flex: 1,
		flexDirection:'row',
		padding:10
	},
	imageWrapper:{
		
	},
	textWrapper:{
		fontSize: 20,
		fontWeight:'500'
	}
})