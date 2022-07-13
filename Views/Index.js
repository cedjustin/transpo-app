import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Map from '../components/Map'
import LocationSet from '../components/LocationSet'
import DrawerButton from '../components/navigation/DrawerButton'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { default as theme } from '../theme/theme.json';
import Test from '../Test'

const Index = ({ navigation }) => {
  const [nameOfUserLocation, setNameOfUserLocation] = useState(null)
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <DrawerButton navigation={navigation} />
        <LocationSet nameOfUserLocation={nameOfUserLocation} />
      </View>
      <Map setNameOfUserLocation={setNameOfUserLocation} />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme['background'],
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  }
})

export default Index