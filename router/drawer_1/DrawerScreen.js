import React, { Component } from 'react'
import { Text, View,  Modal, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from '../tab_2/MainScreen'
import SettingScreen from '../tab_2/SettingScreen'

const Drawer = createDrawerNavigator()

export default class DrawerScreen extends Component {
    constructor() {
        super()
        this.state = {
            flag: true,
            skipTime: 3
        }
    }
    _autoCloseModal = () => {

        setTimeout(() => {
            this.setState({ flag: false })
        }, 3000)
        let a = setInterval(() => {
            if (!this.state.flag) clearInterval(a)
            this.setState({ skipTime: this.state.skipTime - 1 })
        }, 1000)


    }
    _closeModal = () => {
        this.setState({ flag: false })
    }
    render() {
        return (
            <NavigationContainer>
                <Modal
                    style={{ position: "relative" }}
                    transparent={false}
                    visible={this.state.flag}
                    onShow={() => this._autoCloseModal()}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}>
                    <Image style={modalStyles.img} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590732538752&di=e67d5561e1c1450bed44dd8c63d73ab9&imgtype=0&src=http%3A%2F%2Fhbimg.huabanimg.com%2Fc3536a0e320de5e06887705fd72ed968482d78b4c13c-g30WRc_fw236' }}></Image>
                    <TouchableOpacity style={modalStyles.skip} onPress={() => this._closeModal()}>
                        <View style={modalStyles.skipView}>
                            <Text style={{ fontSize: 20 }}>跳过</Text>
                            <Text style={{ fontSize: 18, color: '#fff' }}>{this.state.skipTime}</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <Drawer.Navigator initialRouteName="Main">
                    <Drawer.Screen name="Main" component={MainScreen} />
                    <Drawer.Screen name="Setting" component={SettingScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
const modalStyles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%'
    },
    skip: {
        width: 100,
        height: 50,
        position: "absolute",
        borderRadius: 10,
        backgroundColor: "#aaa",
        right: 20,
        bottom: 20,
        zIndex: 1000
    },
    skipView: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
})
