import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Album from "../leaves_4/Album";
const Stack = createStackNavigator()



export default class HomeScreen extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Album">
            <Stack.Screen name="Album" component={Album} />
        </Stack.Navigator>
        )
    }
}
