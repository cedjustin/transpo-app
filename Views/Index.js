import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Map from '../components/Map'
import LocationSet from '../components/LocationSet'
import DrawerButton from '../components/navigation/DrawerButton'
import { Dimensions, StyleSheet, View } from 'react-native'
import { default as theme } from '../theme/theme.json';
import axios from 'axios';
import mapKey from '../keys/map-key.json'


const Index = ({ navigation }) => {

  // default delta values
  const latitudeDelta = 0.005
  const longitudeDelta = 0.0021

  const [nameOfUserLocation, setNameOfUserLocation] = useState(null)
  const [startingPoint, setStartingPoint] = useState(null)
  const [destination, setDestination] = useState(null)
  const [deltaValues, setDeltaValues] = useState({
    latitudeDelta,
    longitudeDelta
  })
  const [distance, setDistance] = useState(null)
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 1.9403, // rwanda lat
    longitude: 29.8739 // rwanda lng
  })

  const getRegion = async ({ location, position, getLocationName }) => {

    try {
      const lat = parseFloat(location.coords.latitude);
      const lng = parseFloat(location.coords.longitude);

      if (getLocationName) {
        const res = await axios('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + mapKey['map-key'])
        setNameOfUserLocation(res.data.results[3].formatted_address)
      }

      // set coordinates
      setCurrentRegion({
        latitude: lat,
        longitude: lng,
      })

      if (position == "starting-point") {
        setStartingPoint({
          latitude: lat,
          longitude: lng,
        })
      } else {
        setDestination({
          latitude: lat,
          longitude: lng,
        })
      }

      // check distance between coordinates
      if (startingPoint !== null && destination !== null) {

        const res = await axios('https://maps.googleapis.com/maps/api/distancematrix/json?origins=[' + startingPoint.latitude + ',' + startingPoint.longitude + ']&destinations=[' + destination.latitude + ',' + destination.longitude + ']&units=metric&key=' + mapKey['map-key'])
        setDistance(res.data.rows[0].elements[0].distance.value)

      }

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <DrawerButton navigation={navigation} />
        <LocationSet
          nameOfUserLocation={nameOfUserLocation}
          startingPoint={startingPoint}
          setStartingPoint={setStartingPoint}
          destination={destination}
          setDestination={setDestination}
          getRegion={getRegion}
        />
      </View>
      <Map
        setNameOfUserLocation={setNameOfUserLocation}
        startingPoint={startingPoint}
        setStartingPoint={setStartingPoint}
        destination={destination}
        setDestination={setDestination}
        getRegion={getRegion}
        deltaValues={deltaValues}
        currentRegion={currentRegion}
      />
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