import { AppRegistry } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import App from './App/Containers';
import bgMessaging from './App/Services/bgMessaging';

AppRegistry.registerComponent('LLSIFTomodachi', () => gestureHandlerRootHOC(App));
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
