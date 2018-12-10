import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { Metrics } from '../../Theme';
import { AddHTTPS } from '../../Utils';
import { EventStatus } from '../../Config';

/**
 * Event item for Event List Screen
 *
 * Prop:
 * - `item`: [Event object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects)
 * - `onPress`: onPress function
 *
 * State:
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * 
 * @export
 * @class EventItem
 * @extends {Component}
 */
export default class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: Metrics.widthBanner,
      imgHeight: 100
    };
  }

  getImage = (this.props.item.english_image === null)
    ? AddHTTPS(this.props.item.image)
    : AddHTTPS(this.props.item.english_image);

  eventName = ((this.props.item.english_name !== null
    && this.props.item.english_name.length !== 0)
    ? `${this.props.item.english_name}\n` : '')
    + this.props.item.japanese_name;

  render() {
    const { english_status, japan_status } = this.props.item;
    let isAnnounced = japan_status === EventStatus.ANNOUNCED || english_status === EventStatus.ANNOUNCED;
    let isOngoing = japan_status === EventStatus.ONGOING || english_status === EventStatus.ONGOING;
    let label = (isAnnounced) ? EventStatus.ANNOUNCED : ((isOngoing) ? EventStatus.ONGOING : '');
    let color = (isAnnounced) ? '#D1D100' : ((isOngoing) ? '#00C200' : '#EBA3FF');
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[styles.container, { backgroundColor: color }]}>
        <FastImage
          source={{
            uri: this.getImage,
            priority: FastImage.priority.normal
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={(e) => {
            const { width, height } = e.nativeEvent
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          style={{
            alignSelf: 'center',
            width: Metrics.widthBanner,
            height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
          }} />
        <View style={styles.textBox}>
          <Text style={styles.text}>
            {(label.length > 0 ? ('[' + label.toUpperCase() + ']\n') : '') + this.eventName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
