import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Map from '../components/Map'
import LocationSet from '../components/LocationSet'
import DrawerButton from '../components/navigation/DrawerButton'
import { Dimensions, StyleSheet, View } from 'react-native'
import { default as theme } from '../theme/theme.json';
import axios from 'axios';
import mapKey from '../keys/map-key.json'
import TransportationSet from '../components/TransportationSet'
import { MotiView } from 'moti'


const Index = ({ navigation }) => {

  // default delta values
  const latitudeDelta = 0.005
  const longitudeDelta = 0.0021

  const headerBottomRadius = 30

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

  // handle animations
  const [locationSetOpen, setLocationSetOpen] = useState(false)

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
      <MotiView
        style={styles.header}
        from={{
          borderBottomLeftRadius: headerBottomRadius,
          borderBottomRightRadius: headerBottomRadius,
        }}
        animate={{ borderBottomLeftRadius: startingPoint && destination ? 0 : headerBottomRadius, borderBottomRightRadius: startingPoint && destination ? 0 : headerBottomRadius }}
        transition={{ type: 'timing', delay: 1100 }}
      >
        <DrawerButton navigation={navigation} />
        <LocationSet
          nameOfUserLocation={nameOfUserLocation}
          startingPoint={startingPoint}
          setStartingPoint={setStartingPoint}
          destination={destination}
          setDestination={setDestination}
          getRegion={getRegion}
          locationSetOpen={locationSetOpen}
          setLocationSetOpen={setLocationSetOpen}
        />
      </MotiView>
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
      <TransportationSet
        startingPoint={startingPoint}
        destination={destination}
        setStartingPoint={setStartingPoint}
        setDestination={setDestination}
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme['background']
  }
})

export default Index