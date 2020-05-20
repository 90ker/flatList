import React, { Component } from 'react'
import {  Text, View, Image, StyleSheet} from 'react-native'

export default class Detail extends Component {
    render() {
        const {params:{item}} = this.props.route
        return (
            <View style={styles.view}>  
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.singerView}>
                        {item.singer.map((singer1,index1)=>
                        <Text style={styles.singer} key={index1}>{singer1}</Text>
                        )}
                    </View>
                    <Image source={{ uri: item.img }} style={styles.img} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    view:{
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center"
    },
    img:{
        width:300,
        height:300
    },
    name:{
        fontSize:50
    },
    singer:{
        fontSize:25
    },
    singerView:{
        display:"flex",
        flexDirection:"row"
    }
  })
