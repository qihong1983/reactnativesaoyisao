/**
 * create by xiaohong on 2018/08/03
 * reducers
 */
import * as TYPES from '../../ActionType';
import moment from 'moment';
import _ from 'lodash';

import StorageUtil from '../../utils/StorageUtil';

import {
	Button,
	Toast,
	WhiteSpace,
	WingBlank
} from 'antd-mobile-rn';

const toQueryString = (obj) => {
	return obj ? Object.keys(obj).sort().map(function(key) {
		var val = obj[key];
		if (Array.isArray(val)) {
			return val.sort().map(function(val2) {
				return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
			}).join('&');
		}
		return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	}).join('&') : '';
}

/**
 * 切换Tab
 * @method changeTab
 * @param data
 */
const changeTab = (data) => {
	return function(dispatch) {

		console.log('xxx');

		dispatch({
			type: TYPES.HOME_TAB_SELECTED,
			payload: data
		});

	}
}

/**
 * 拉数据
 * @method getData
 */
const getData = () => {
	return async function(dispatch) {
		let res = await fetch("http://api.tanghs.com/api/v1/coin_matching", {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		});

		let json = await res.json();



		if (json.status.code == 200) {
			dispatch({
				type: TYPES.HOME_TAB_DATA,
				payload: json.data
			});
		}

	}
}

const getToken = () => {
	return async function(dispatch) {
		let res = await fetch("http://tokendemo.youyong.ba/token", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"password": "demopass",
				"username": "demouser"
			})
		});

		let json = await res.json();

		console.log(json.token, 'xxxxxxxxxxyyyy@@@@');
		console.log(json, 'xxxxxxxxxxx');

		if (json.status) {
			dispatch({
				type: TYPES.HOME_TAB_DATA,
				payload: json.data
			});


			StorageUtil.saveJsonObject('token', json.token);

			Toast.success('已获得token');
		}

	}
}

export {
	//tab切换
	changeTab,
	//拉数据
	getData,
	//获取token
	getToken
}