import React from 'react';

//react-native 原生组件
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	AppRegistry,
	Alert,
	StatusBar,
	ScrollView,
	WebView,
	ViewStyle,
	TextStyle,
	Dimensions,
	Image,
	Animated,
	Easing
} from 'react-native';

import {
	RNCamera
} from "react-native-camera";

const {
	width,
	height
} = Dimensions.get('window');

//antd库
import {
	Button,
	TabBar,
	SearchBar,
	WhiteSpace,
	WingBlank,
	NoticeBar,
	Toast,
	Tabs
} from 'antd-mobile-rn';

//redux方法绑定
import {
	bindActionCreators
} from 'redux';

import {
	connect
} from 'react-redux';

//走马灯
import Carousel from 'react-native-looped-carousel';

let actionCreators = null;
import * as GetWeatherActions from '../actions/GetWeatherAction';
import * as MainActions from '../actions/Main/Main';
import * as HomeActions from '../actions/Home/Home';


//本地存储
import StorageUtil from '../utils/StorageUtil';

actionCreators = Object.assign({}, GetWeatherActions, MainActions, HomeActions);


//本地数据库
// import Taffy from 'taffy';

import _ from 'lodash';



class Home extends React.Component {


	constructor(props) {
		super(props);

		// console.log(new Animated.Value(0), 'xxxx');

		this.state = {
			moveAnim: new Animated.Value(0)
		};

	}


	componentWillMount() {

		this.startAnimation();
		this.props.getToken();


	}

	startAnimation = () => {
		this.state.moveAnim.setValue(0);
		Animated.timing(
			this.state.moveAnim, {
				toValue: -200,
				duration: 1500,
				easing: Easing.linear
			}
		).start(() => this.startAnimation());
	};
	//  识别二维码
	onBarCodeRead = async (result) => {

		// console.log(result, 'yyyyyyy');

		// this.props.navigation.push('Main');

		// Alert.alert(result.data);


		const {
			navigate
		} = this.props.navigation;

		// navigate.push('Main');

		// console.log(navigate, 'navigatenavigatenavigatenavigatenavigate');


		await this.props.navigation.replace('SucessQrcode', {
			uuid: result
		});


		const {
			data
		} = result;
		// navigate('Sale', {
		// 	url: data
		// })
	};


	render() {


		return (
			<View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                    </RNCamera>
            </View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: width,
		height: height
	},
	rectangleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	rectangle: {
		height: 200,
		width: 200,
		borderWidth: 1,
		borderColor: '#00FF00',
		backgroundColor: 'transparent'
	},
	rectangleText: {
		flex: 0,
		color: '#fff',
		marginTop: 10
	},
	border: {
		flex: 0,
		width: 200,
		height: 2,
		backgroundColor: '#00FF00',
	}
});


const mapStateToProps = (state) => {
	return {
		GetWeatherReducer: state.getWeather,
		Main: state.Main,
		Home: state.Home
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);