import React, { Component } from 'react'
import { Text, View, Button, Image, FlatList, TextInput } from 'react-native'
import RNFS from 'react-native-fs'
import ProcessBar from './ProcessBar'
const path = RNFS.DocumentDirectoryPath

export default class Camera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            src: { uri: '' },
            filename: '',
            filenames: [],
            _downUrl: '',
            progress: 0
        }
    }
    _write = () => {
        RNFS.writeFile(path + '/' + this.state.filename, 'contents', 'utf8')
            .then(() => {
                let filenames = this.state.filenames.slice()
                filenames.push(this.state.filename)
                this.setState({ filenames, filename: '' })

            })
    }
    _del = () => {
        RNFS.unlink(path + '/' + this.state.filename)
            .then(() => {
                let filenames = this.state.filenames.slice()
                let index = filenames.indexOf(this.state.filename)
                filenames.splice(index, 1)
                this.setState({ filenames, filename: '', src: { uri: '' } })
            })
    }
    _down = () => {
        let url = 'https://game.gtimg.cn/images/lol/act/img/skin/big61000.jpg'
        let name = url.split('/').splice(-1)[0]
        let filenames = this.state.filenames.slice()
        if (!filenames.includes(name)) {
            let df = RNFS.downloadFile({ fromUrl: url, toFile: path + '/' + name, progressDivider: 10, progress: () => this._setProgress(), begin: () => this.setState({ progress: 0 }) })
            df.promise
                .then(res => {
                    filenames.push(name)
                    this.setState({ filenames, progress: 1  })
                })
        }

    }
    _setProgress = () => {
        this.setState({
            progress: this.state.progress + 0.1
        })
    }
    _click = (item) => {
        console.log('aa')
        this.setState({ filename: item })
        RNFS.readFile(path + '/' + item, 'base64')
            .then(res => {
                this.setState({
                    src: { uri: 'data:image/png;base64,' + res }
                })
            })
    }
    _text = (value) => {
        this.setState({
            filename: value
        })
    }
    _downUrl = (value) => {
        this.setState({
            downUrl: value
        })
    }
    componentDidMount() {
        RNFS.readDir(path)
            .then((items) => {
                let filenames = []
                items.map((item) => {
                    filenames.push(item.name)
                })
                this.setState({
                    filenames
                })
            })
    }

    render() {
        return (
            <View>
                <TextInput value={this.state.filename} onChangeText={(value) => this._text(value)}></TextInput>
                <Button title="写" onPress={() => this._write()}></Button>
                <Button title="删" onPress={() => this._del()}></Button>
                <TextInput value={this.state.downUrl} onChangeText={(value) => this._downUrl(value)}></TextInput>
                <Button title="下载" onPress={() => this._down()}></Button>
                <ProcessBar progress={this.state.progress} />
                <FlatList
                    keyExtractor={(item, key) => { key.toString() }}
                    data={this.state.filenames}
                    renderItem={({ item, index }) =>
                        <Text key={index} onPress={() => this._click(item)}>{item}</Text>
                    } />
                <Image style={{ width: '100%', height: 200 }} source={this.state.src ? this.state.src : null}></Image>
            </View>
        )
    }
}
