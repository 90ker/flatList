import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Singers from "../leaves_4/Singers";
const Stack = createStackNavigator()



export default class HomeScreen extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Singers">
                <Stack.Screen name="Singers" component={Singers} />
            </Stack.Navigator>
        )
    }
}
