import React, { Component } from 'react'
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'


export default class App extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      loadLists:[]
    }
    this.navigate = this.props.navigation.navigate
  }

  componentDidMount() {
    fetch("http://www.cjlly.com:3046/record")
      .then(res => res.json())
      .then(lists => this.setState({ lists }))
        .then(()=>this._load())
    
  }

  _goDetail= (item)=>{
    console.log(item)
    this.navigate('详情',{item})
  }
  _load=()=>{
    this.setState({
        loadLists:this.state.loadLists.concat(this.state.lists.splice(0,4))
    })
    console.log("aaa")
  }

  render() {
    return (
      <View style={{ width: "100%" }}>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.loadLists}
          onEndReached={()=>this._load()}
          renderItem={({item, index}) =>
            <TouchableOpacity onPress={()=>this._goDetail(item)}>
              <View style={styles.view} key={index}>
                <Text style={styles.id}>{item.id}</Text>
                <View style={styles.insideView}>
                  <Image source={{ uri: item.img }} style={styles.img} />
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.singerView}>
                    {item.singer.map((singer1,index1)=>
                      <Text style={styles.singer} key={index1}>{singer1}</Text>
                    )}
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
    marginBottom:20,
    width:"60%"
  },
  id :{
    fontSize: 30
  },
  insideView: {
    display: "flex",
  },
  rightView: {
    display: "flex",
    justifyContent:"space-around",
  },
  name:{
    fontSize: 25
  },
  singer:{
    fontSize:20,
    marginRight:5

  },
  singerView:{
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap"
  },
  img: {
    width: 150,
    height: 150
  }
})