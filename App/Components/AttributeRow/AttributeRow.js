import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Images } from '../../Theme'
import styles from '../../Theme/RowStyles'

/**
 * Attribute Row
 *
 * @function selectAttribute: Save `attribute` state
 * @param attribute state
 * @export
 * @class AttributeRow
 * @extends {React.Component}
 */
export default class AttributeRow extends React.Component {
  static propTypes = {
    attribute: PropTypes.string.isRequired,
    selectAttribute: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Attribute</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectAttribute('')}
            style={[
              styles.button1,
              { paddingLeft: 0 },
              this.props.attribute === '' && styles.selectedValue1
            ]}>
            <Image source={Images.empty} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectAttribute('Smile')}
            style={[
              styles.button1,
              this.props.attribute === 'Smile' && styles.selectedValue1
            ]}>
            <Image source={Images.attribute[0]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectAttribute('Pure')}
            style={[
              styles.button1,
              this.props.attribute === 'Pure' && styles.selectedValue1
            ]}>
            <Image source={Images.attribute[1]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectAttribute('Cool')}
            style={[
              styles.button1,
              this.props.attribute === 'Cool' && styles.selectedValue1
            ]}>
            <Image source={Images.attribute[2]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectAttribute('All')}
            style={[
              styles.button1,
              this.props.attribute === 'All' && styles.selectedValue1
            ]}>
            <Image source={Images.attribute[3]} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
