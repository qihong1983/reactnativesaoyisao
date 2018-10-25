import React from 'react';

import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	ScrollView
} from 'react-native';

import {
	Button,
	TabBar,
	SearchBar,
	WhiteSpace,
	WingBlank,
	NoticeBar,
	List,
	InputItem,
	Icon,
	Grid,
	Card,
	Toast
} from 'antd-mobile-rn';

import StorageUtil from '../utils/StorageUtil';

export default class SucessQrcode extends React.Component {


	constructor(props) {
		super(props);

		this.state = {

			token: ""
		}
	}

	onSubmit = async () => {


		var uuid = this.props.navigation.state.params.uuid.data;
		// getString
		var token = this.state.token;


		// Toast.success(JSON.stringify({
		// 	uuid: uuid,
		// 	token: token
		// }));
		// var token = StorageUtil.getJsonObject('token');

		let res = await fetch("http://tokendemo.youyong.ba/updateUuid", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				uuid: uuid,
				token: token
			})
		});

		let json = await res.json();

		// console.log(json);
		// Toast.fail(JSON.stringify(json));

		// if (json.status == false) {
		// 	Toast.fail('登录失败!');
		// } else {
		// 	Toast.success('登录成功');
		// }


		Toast.success('已点确认登录');
	}

	componentDidMount() {

		// Toast.success('asdfasdf');
		// Toast.success(JSON.stringify(this.props.navigation.state.params.uuid.data));
		// Toast.success(StorageUtil.getJsonObject('token'));
		var token = '';
		StorageUtil.getJsonObject('token').then(data => {


			this.setState({
				token: data
			}, function() {
				// Toast.success(this.state.token);
			}.bind(this))
		});



		console.log(this.props);
	}

	render() {
		return (
			<ScrollView >
		  		<WhiteSpace size="md"/>
          		<Card full >
		            <Card.Header
		              thumbStyle={{ width: 30, height: 30 }}
		              thumb="https://m.imx.com/static/img/titleLogowhite.0068420.png"
		            />
					<Card.Body>
						<Text>点机下面的按扭确认登录</Text>
						<List>
							
							<List.Item >
								<Button type="primary" onClick={() => {this.onSubmit()}}>确认登录</Button>
							</List.Item>
						</List>
					</Card.Body>
				</Card>
            </ScrollView>
		);
	}
}