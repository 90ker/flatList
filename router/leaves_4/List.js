import React, { Component } from 'react'
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native'


export default class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      num:4,
      singer:''
      
    }
    this.navigate = this.props.navigation.navigate
  }
  componentWillMount(){
    if(this.props.route.params){
      let {songs,singer} = this.props.route.params
      this.setState({lists:songs,singer})
      console.log('a')
    }
  }
  componentWillReceiveProps=(nextprops)=>{
      let {songs,singer} = nextprops.route.params
      this.setState({lists:songs,singer})
  }
  _goDetail = (index) => {
    let lists = this.state.lists
    let singer = this.state.singer
    this.navigate('Detail', { index ,lists ,singer})
  }

  _loadErrorImg=(index)=>{
    let lists = this.state.lists
    lists[index].img='http://101.201.121.40:8080/imgs/none.jpg'
    this.setState({
      lists
    })
  }
  render() {
    if (this.state.lists==[]) return (<View><Text>请选择歌手</Text></View>)
    return (
      <View style={{ width: "100%" }}>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.lists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => this._goDetail(index)}>
              <View style={styles.view} >
                <View style={styles.insideView}>
                  <Image onError={()=>this._loadErrorImg(index)} source={{uri: item.img}} style={styles.img} />
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.singerView}>
                      <Text style={styles.singer}>{this.state.singer}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%"
  },
  id: {
    fontSize: 30
  },
  insideView: {
    display: "flex",
  },
  rightView: {
    display: "flex",
    justifyContent: "space-around",
    width: "40%"
  },
  name: {
    fontSize: 25,
    color: "blue"
  },
  singer: {
    fontSize: 20,
    marginRight: 5,
    color: "pink"
  },
  singerView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  img: {
    width: 150,
    height: 150
  },
  delete: {
    backgroundColor: "lightgreen",
    width: 80,
    height: 40,
    color: "black",
    lineHeight: 40,
    textAlign: "center",
    fontSize: 25
  }
})
