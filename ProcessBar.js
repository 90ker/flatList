import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, LayoutAnimation} from 'react-native';
let viewWidth = 0
export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    LayoutAnimation.linear();
  }
  render() {
    const { progress, height, barColor, fillColor } = this.props
    return (
      <View style={{
        backgroundColor: barColor,
        height,
        borderRadius: height / 2
      }} onLayout={(event)=>{
        viewWidth = event.nativeEvent.layout.width
      }}>
        <View style={{
          backgroundColor: fillColor,
          height,
          width: viewWidth * progress,
          borderRadius: height / 2
        }} />
      </View>
    )
  }
}
ProgressBar.propTypes = {
  progress: PropTypes.number,   
  height: PropTypes.number,     
  barColor: PropTypes.string,   
  fillColor: PropTypes.string,
}
ProgressBar.defaultProps = {
  progress: 0.1,
  height: 20,
  barColor: '#d7dada',
  fillColor: '#6285f7'
}