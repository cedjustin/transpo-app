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
  const [nameOfUserLocation, setNameOfUserLocation] = useState(null)
  const [startingPoint, setStartingPoint] = useState({
    latitude: 1.9403,
    longitude: 29.8739
  })
  const [destination, setDestination] = useState(null)
  const [deltaValues, setDeltaValues] = useState(null)

  const getRegion = async ({ location, position, getLocationName }) => {

    const centroid = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    const boundingBox = {
      southWest: {
        latitude: centroid.latitude - 0.002569,
        longitude: centroid.longitude + 0.003787
      },
      northEast: {
        latitude: centroid.latitude + 0.002569,
        longitude: centroid.longitude + 0.003778
      }
    }

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;

    const lat = parseFloat(centroid.latitude);
    const lng = parseFloat(centroid.longitude);
    const northeastLat = parseFloat(boundingBox.northEast.latitude);
    const southwestLat = parseFloat(boundingBox.southWest.latitude);
    const latDelta = northeastLat - southwestLat;
    const lngDelta = latDelta * ASPECT_RATIO;

    if (getLocationName) {
      try {
        const res = await axios('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.coords.latitude + ',' + location.coords.longitude + '&key=' + mapKey['map-key'])
        setNameOfUserLocation(res.data.results[3].formatted_address)
      } catch (e) {
        console.log(e)
      }
    }

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

    setDeltaValues({
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    })

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