import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Map from '../components/Map'
import LocationSet from '../components/LocationSet'
import DrawerButton from '../components/navigation/DrawerButton'
import { StyleSheet, View } from 'react-native'
import { default as theme } from '../theme/theme.json';
import Test from '../Test'

const Index = ({ navigation }) => {
  return (
    <ScreenWrapper>
      {/* <View style={styles.header}>
        <DrawerButton navigation={navigation} />
        <LocationSet />
      </View>
      <Map /> */}
      <Test />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: theme['background'],
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  }
})

export default Index