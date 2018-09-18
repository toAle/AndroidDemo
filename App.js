/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";

import { Image, FlatList, ActivityIndicator, StyleSheet, Text, View } from "react-native";

var REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class SampleAppMovies extends Component {
	_keyExtractor = (item, index) => item.id;
	constructor(props) {
		super(props);
		this.state = { 
			data: [],
			loaded: false,
			refreshing: false
		}

		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(REQUEST_URL)
		.then(response => response.json())
		.then(responseData => {
			this.setState({
				data: this.state.data.concat(responseData.movies),
				loaded: true
			})
		})
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return(
			<FlatList 
				data = { this.state.data }
				renderItem = { this.renderMovie }
				style = { styles.list }
				keyExtractor = { this._keyExtractor }
				refreshing={ this.state.refreshing }
				onRefresh={ this._renderRefresh }
			/>
		);
	}

	// 下拉刷新
    _renderRefresh = () => {
        this.setState({refreshing: true}) 
        setTimeout(() => {
			alert("No refreshable content");
            this.setState({refreshing: false});
        }, 3000);
	};

	renderLoadingView() {
		return(
			<View style = { styles.container }>
				<ActivityIndicator size="large" color="#999999" />
				<Text style = { styles.loadText }>Loading movies...</Text>
			</View>
		);
	}

	renderMovie({ item }) {
		return(
			<View style = { styles.container }>
				<Image 
					source = {{ uri: item.posters.thumbnail }}
					style = { styles.thumbnail }
				/>
				<View style = { styles.rightContainer }>
					<Text style = { styles.title }>{ item.title }</Text>
					<Text style = { styles.year }>{ item.year }</Text>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 15
	},
	loadText: {
		fontSize: 20,
		paddingLeft: 10,
		color: "#666666"
	},
	rightContainer: {
		flex: 1,
		paddingLeft: 20
	},
	title: {
		fontSize: 20,
		color: "#333333",
		marginBottom: 10,
		textAlign: "left"
	},
	year: {
		textAlign: "left"
	},
	thumbnail: {
		width: 53,
		height: 81
	},
	list: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: "#E5FEFF"
	}
});