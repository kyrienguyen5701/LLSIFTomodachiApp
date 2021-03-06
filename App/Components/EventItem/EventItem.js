import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Touchable from '../Touchable/Touchable';
import { Metrics, Colors } from '~/Theme';
import { AddHTTPS } from '~/Utils';
import { EventStatus } from '~/Config';

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
      imgHeight: 100,
      label: '',
      color: Colors.finished,
    };
  }

  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  };

  componentDidMount() {
    const ENStatus = this.props.item.english_status;
    const JPStatus = this.props.item.japan_status;
    const isAnnounced = JPStatus === EventStatus.ANNOUNCED || ENStatus === EventStatus.ANNOUNCED;
    const isOngoing = JPStatus === EventStatus.ONGOING || ENStatus === EventStatus.ONGOING;
    if (isAnnounced) {
      this.setState({
        label: EventStatus.ANNOUNCED,
        color: Colors.announced,
      });
    } else if (isOngoing) {
      this.setState({
        label: EventStatus.ONGOING,
        color: Colors.ongoing,
      });
    }
  }

  getImage = (this.props.item.english_image === null)
    ? AddHTTPS(this.props.item.image)
    : AddHTTPS(this.props.item.english_image);

  eventName = ((this.props.item.english_name !== null
    && this.props.item.english_name.length !== 0)
    ? `${this.props.item.english_name}\n` : '')
    + this.props.item.japanese_name;

  render() {
    const {
      imgHeight, imgWidth, color, label,
    } = this.state;
    const styleImage = {
      alignSelf: 'center',
      width: Metrics.widthBanner,
      height: (Metrics.widthBanner * imgHeight) / imgWidth,
    };
    return (
      <ElevatedView elevation={5} style={[styles.container, { backgroundColor: color }]}>
        <Touchable onPress={this.props.onPress} useForeground
          background={TouchableNativeFeedback.Ripple(color, false)}>
          <FastImage
            source={{
              uri: this.getImage,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={(e) => {
              const { width, height } = e.nativeEvent;
              this.setState({ imgWidth: width, imgHeight: height });
            }}
            style={styleImage} />
          <View style={styles.textBox}>
            <Text style={styles.text}>
              {(label.length > 0 ? (`[${label.toUpperCase()}]\n`) : '') + this.eventName}
            </Text>
          </View>
        </Touchable>
      </ElevatedView>
    );
  }
}
