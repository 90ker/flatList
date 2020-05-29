import React, { Component } from 'react'
import { FlatList,Modal, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native'


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      loadLists: [],
      flag: true,
      skipTime: 3
    }
    this.navigate = this.props.navigation.navigate
  }

  componentDidMount() {
    fetch("http://www.cjlly.com:3046/record")
      .then(res => res.json())
      .then(lists => this.setState({ lists }))
      .then(() => this._load())

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
    console.log('aaaa')
    this.setState({ flag: false })
  }
  _goDetail = (item) => {
    console.log(item)
    this.navigate('Detail', { item })
  }
  _load = () => {
    this.setState({
      loadLists: this.state.loadLists.concat(this.state.lists.splice(0, 4))
    })
  }
  _onPressButton = (item) => {
    for (let a in this.state.loadLists) {
      if (this.state.loadLists[a].id == item.id) {
        this.state.loadLists.splice(a, 1)
        this.setState({
          loadLists: this.state.loadLists
        })
      }
    }
  }
  render() {
    return (
      <View style={{ width: "100%" }}>
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
        <FlatList
          style={{ width: "100%" }}
          data={this.state.loadLists}
          onEndReached={() => this._load()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => this._goDetail(item)}>
              <View style={styles.view} >
                <Text style={[styles.id, item.id < 4 ? { color: "red" } : {}]}>{item.id}</Text>
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