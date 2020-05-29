import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './List.js'
import Detail from './Detail.js'
import Camera from './Camera.js'
import { Text } from 'react-native';


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()


function MainScreen() {
    return (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Buy" component={Buy} />
                    <Tab.Screen name="FAQ" component={FAQ} />
                </Tab.Navigator>
    )
}

function SettingScreen() {
    return(
        <Text> bbbbbbbb</Text>
    )
}

function Home() {
    return(
        <Text>a</Text>
    )
}

function Buy() {
    return(
        <Stack.Navigator initialRouteName="List">
                    <Stack.Screen name="List" component={List} />
                    <Stack.Screen name="Detail" component={Detail} />
                </Stack.Navigator>
    )
}

function FAQ() {
    return(
        <Text> c</Text>
    )
}


export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Main">
                    <Drawer.Screen name="Main" component={MainScreen} />
                    <Drawer.Screen name="Setting" component={SettingScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
