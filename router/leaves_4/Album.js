import React, { Component } from 'react'
import { Text, View, StyleSheet,FlatList } from 'react-native'

export default class Album extends Component {
    constructor() {
        super()
        this.state = {
            list: [1, 2, 3, 4, 5, 6,7,8]
        }
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
                        <View style={albumStyles.item} key={index}>
                            <Text>{item}</Text>
                        </View>
                    )}/>
            </View>
        )
    }
}
const albumStyles = StyleSheet.create({
    list: {
        width: '100%',
        height:'100%',
        backgroundColor: 'red',
    },
    item: {
        width: '45%',
        margin:10,
        height: 150,
        backgroundColor: 'yellow'
    }
})