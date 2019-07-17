import { connect } from 'react-redux';
import EventDetailScreen from './EventDetail';

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
  wwEventInfo: state.reducer.cachedData.eventInfo.ww,
  jpEventInfo: state.reducer.cachedData.eventInfo.jp,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
