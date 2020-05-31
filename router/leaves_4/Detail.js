import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import ViewPager from '@react-native-community/viewpager';
import AntDesign from "react-native-vector-icons/AntDesign"
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';


export default class Detail extends Component {
    constructor() {
        super()
        this.page=null
        this.player=null
        this.songsUri='http://101.201.121.40:8080/songs/'
        this.state = {
            pause: true,
            progress: 0,
            duration: 0,
            maxTime:'0:00',
            nowTime:'0:00',
            currentTime: 0,
            nowSong:0,
            srcList:['BeatIt','BillieJean','MoogCity','TheyDon\'tCareAboutUs','YouAreNotAlone']
            
        }
    }
    _format=(time)=>{
        let minute = (time/60).toFixed(0)
        let sec = (time%60).toFixed(0)
        return minute+':'+(sec<10?'0'+sec:sec)
    }
    _change = () => {
        this.setState({
            pause: !this.state.pause
        })
    }
    _next = ()=>{
        let nowSong = this.state.nowSong
        this.page.setPage(nowSong+1)
        this._changeSong(nowSong+1)
    }
    _before= ()=>{
        let nowSong = this.state.nowSong
        this.page.setPage(nowSong-1)
        this._changeSong(this.state.nowSong-1)
    }
    _setSongProgress = ({ currentTime }) => {
        let nowTime = this._format(currentTime)
        this.setState({
            currentTime,
            nowTime
        })
    }
    _setDuration = ({ duration }) => {
        let maxTime = this._format(duration)
        this.setState({
            duration,
            maxTime
        })
    }
    _error = () => {
        alert('error')
        this.setState({ src: { uri: '' } })
    }
    _changeCurrent=(value)=>{
        this.player.seek(value)
    }
    _changeSong=(index)=>{
        this.setState({
            nowSong:index,
            nowTime:'0:00'
        })
    }
    render() {
        const { params: { index, lists } } = this.props.route
        return (
            <View>
                <ViewPager ref={ref=>this.page=ref} style={{ width: '100%', height: 400 }}  onPageSelected={({nativeEvent})=>this._changeSong(nativeEvent.position)} initialPage={index}>
                    {
                        lists.map((item, i) => {
                            return <View style={styles.view} key={i}>
                                <Image source={{ uri: item.img }} style={styles.img} />
                                <View style={styles.content}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <View style={styles.singerView}>
                                        {item.singer.map((singer1, index1) =>
                                            <Text style={styles.singer} key={index1}>{singer1}</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        })
                    }
                </ViewPager>
                <View style={styles.controlBar}>
                    <AntDesign name='stepbackward' size={30} color='lightblue' onPress={() => this._before()} />
                    <AntDesign name={this.state.pause ? 'caretright' : 'pausecircle'} size={30} color='lightblue' onPress={() => this._change()} />
                    <AntDesign name='stepforward' size={30} color='lightblue' onPress={() => this._next()} />
                </View>
                <Video
                    ref={ref=>this.player=ref}
                    paused={this.state.pause}
                    progressUpdateInterval={1000}
                    onProgress={this._setSongProgress}
                    onLoad={this._setDuration}
                    onError={this._error}
                    source={{uri:this.songsUri+this.state.srcList[this.state.nowSong]+'.mp3'}} />
                <View style={styles.sliderBar}>
                    <Slider
                        onValueChange={(value)=>this._changeCurrent(value)}
                        style={{ width: '80%', height: 40 }}
                        value={this.state.currentTime}
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        minimumTrackTintColor="pink"
                        maximumTrackTintColor="lightblue"
                    />
                    <Text style={{ fontSize: 20 }}>{this.state.nowTime+' / '+this.state.maxTime}</Text>
                </View>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    sliderBar: {
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    view: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    img: {
        width: 200,
        height: 200
    },
    content: {
        width: "100%",
        height: 120,
        display: 'flex',
        justifyContent: 'space-between'
    },
    name: {
        height: 40,
        width: '100%',
        fontSize: 30,
        textAlign: "center"
    },
    singerView: {
        height: 60,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    singer: {
        height: 30,
        fontSize: 20,
        width: 100,
        textAlign: "center"
    },
    controlBar: {
        display: 'flex',
        width: '100%',
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around"

    }

})
