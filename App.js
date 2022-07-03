import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme/theme.json';
import { StatusBar, View } from 'react-native';
import Navigation from './Navigation';

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
