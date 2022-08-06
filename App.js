import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme/theme.json';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';
import 'react-native-reanimated'

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <StatusBar
        animated={true}
        backgroundColor={theme['background']}
        barStyle='light'
      />
      <Navigation />
    </ApplicationProvider>
  );
}
