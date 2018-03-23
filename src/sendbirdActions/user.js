import SendBird from 'sendbird'

const APP_ID = 'A7A2672C-AD11-11E4-8DAA-0A18B21C2D82'

export const sbConnect = (userID, nickname) => {
	return new Promise((resolve, reject) =>{
        	// alert(userID);
		
		const sb = new SendBird({'appId':APP_ID});
		sb.connect(userID, (user, error) => {
			if(error){
				reject('SendBird login failed')
			}else{
				resolve(sbUpdateProfile(nickname));
			}
		})

	})
}



export const sbDisconnect = () =>{
	return new Promise((resolve, reject) => {
		const sb = SendBird.getInstance();

		if(sb){
			sb.disconnect(() => {
				resolve(null);
			})
		}else{
			resolve(null);			
		}
	})
}

export const sbGetCurrentInfo = () => {
	const sb = SendBird.getInstance();
	return  {
		profileUrl:sb.currentUser.profileUrl,
		nickname: sb.currentUser.nickname
	}
}

export const sbUpdateProfile = (nickname) => {
	return new Promise ((resolve, reject) =>{
		if(!nickname){
			reject('nickname is required');
			return;
		}
		const sb = SendBird.getInstance()
		sb.updateCurrentUserInfo(nickname, null, (user, error) => {
			if(error){
				reject('Update profile failed');
			}else{
				resolve(user);
			}
		})
	})
}