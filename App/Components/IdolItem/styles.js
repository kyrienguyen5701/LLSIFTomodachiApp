import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: Colors.itemColor,
    width: Metrics.images.smallItemWidth,
    margin: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin
  },
  info: {
    flexDirection: 'row',
    paddingVertical: Metrics.smallMargin,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
});
