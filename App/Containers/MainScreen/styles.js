import { StyleSheet } from 'react-native'
import { Colors, Metrics } from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink
  },
  logo: {
    width: '70%',
    resizeMode: 'contain'
  },
  body: {
    paddingVertical: Metrics.baseMargin,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    padding: Metrics.baseMargin,
  },
  title: {
    color: 'white',
    fontSize: 24,
    padding: Metrics.baseMargin,
  }
})
