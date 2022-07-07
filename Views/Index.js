import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Map from '../components/Map'
import LocationSet from '../components/LocationSet'
import DrawerButton from '../components/navigation/DrawerButton'

const Index = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <DrawerButton navigation={navigation} />
      <LocationSet />
      <Map />
    </ScreenWrapper>
  )
}

export default Index