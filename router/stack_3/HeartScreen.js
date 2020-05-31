import React, { Component } from 'react'
import List from "../leaves_4/List";
import Detail from "../leaves_4/Detail";
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default class HeartScreen extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="List">
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        )
    }
}
