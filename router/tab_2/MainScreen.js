import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from "react-native-vector-icons/AntDesign"
import HeartScreen from "../stack_3/HeartScreen";
import HomeScreen from "../stack_3/HomeScreen";
import StarScreen from "../stack_3/StarScreen";

const Tab = createBottomTabNavigator()

export default class MainScreen extends Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'HomeScreen') {
                            iconName = 'home'
                        } else if (route.name === 'HeartScreen') {
                            iconName = focused ? 'heart' : 'hearto'
                        } else if (route.name === 'StarScreen') {
                            iconName = focused ? 'star' : 'staro'
                        }
                        return <AntDesign name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'pink',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="HeartScreen" component={HeartScreen} />
                <Tab.Screen name="StarScreen" component={StarScreen} />
            </Tab.Navigator>
        )
    }
}