import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import List from './List.js'
import Detail from './Detail.js'


const Stack = createStackNavigator()


export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"列表"}>
                    
                    <Stack.Screen name="详情" component={Detail}/>
                    <Stack.Screen name="列表" component={List}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
