import React, { Component } from 'react'
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      loadLists: []
    }
    this.navigate = this.props.navigation.navigate
  }

  componentDidMount() {
    fetch("http://www.cjlly.com:3046/record")
      .then(res => res.json())
      .then(lists => this.setState({ lists }))
      .then(() => this._load())

  }

  _goDetail = (item) => {
    console.log(item)
    this.navigate('详情', { item })
  }
  _load = () => {
    this.setState({
      loadLists: this.state.loadLists.concat(this.state.lists.splice(0, 4))
    })
  }
  _onPressButton = (item) => {
    for(let a in this.state.loadLists){
      if(this.state.loadLists[a].id ==item.id){
        this.state.loadLists.splice(a,1)
        this.setState({
          loadLists: this.state.loadLists
        })
      }
    }
  }
  render() {
    return (
      <View style={{ width: "100%" }}>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.loadLists}
          onEndReached={() => this._load()}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => this._goDetail(item)}>
              <View style={styles.view} key={index}>
                <Text style={[styles.id,item.id<4?{color:"red"}:{}]}>{item.id}</Text>
                <View style={styles.insideView}>
                  <Image source={{ uri: item.img }} style={styles.img} />
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.singerView}>
                    {item.singer.map((singer1, index1) =>
                      <Text style={styles.singer} key={index1}>{singer1}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity onPress={() => this._onPressButton(item)}>
                  <Text style={styles.delete}>删除</Text>
                </TouchableOpacity>
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
    alignItems:"center",
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
    width:"40%"
  },
  name: {
    fontSize: 25,
    color:"blue"
  },
  singer: {
    fontSize: 20,
    marginRight: 5,
    color:"pink"
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