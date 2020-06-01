import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'

export default class Singers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.navigate = this.props.navigation.navigate
    }
    componentDidMount() {
        fetch("http://101.201.121.40:8080/singers/singers.json")
            .then(res => res.json())
            .then(list => {
                let array = []
                for (let a in list) {
                    let b = {}
                    b[a] = list[a]
                    array.push(b)
                }

                this.setState({
                    list: array
                })
            })

    }
    _loadErrorImg = (index) => {
        let list = this.state.list
        list[index][Object.keys(list[index])[0]][0].img = 'http://101.201.121.40:8080/imgs/none.jpg'
        this.setState({
            list
        })
    }
    _goList = (songs, singer) => {
        this.navigate('HeartScreen', {
            screen: 'List',
            params: { songs,singer},
          })
    }
    render() {
        return (
            <View style={albumStyles.list}>
                <FlatList
                    style={albumStyles.list}
                    data={this.state.list}
                    numColumns={2}
                    horizontal={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={albumStyles.item} key={index} onPress={() => this._goList(item[Object.keys(item)[0]], Object.keys(item)[0])}>
                            <Image onError={() => this._loadErrorImg(index)} style={albumStyles.img} source={{ uri: item[Object.keys(item)[0]][0].img }} />
                            <Text style={{ fontSize: 20 }}>{Object.keys(item)[0]}</Text>
                        </TouchableOpacity>
                    )} />
            </View>
        )
    }
}
const albumStyles = StyleSheet.create({
    list: {
        width: '100%',
        height: '100%',
    },
    item: {
        width: '50%',
        marginVertical: 20,
        height: 150,
        display: "flex",
        alignItems: "center",
    },
    img: {
        width: '80%',
        height: 120,
    }
})