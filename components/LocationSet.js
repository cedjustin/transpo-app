import React from 'react'
import { Dimensions, StyleSheet, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import mapKey from '../keys/map-key.json'
import { default as theme } from '../theme/theme.json';
import PlacesInput from 'react-native-places-input';

//images
import startingPointPin from '../assets/starting-point-pin.png'
import destinationPin from '../assets/destination-pin.png'
import { MotiView } from 'moti';
import { Button, Text } from '@ui-kitten/components';

const LocationSet = (props) => {

  const setPlace = (place, position) => {

    // Hide keyboard
    Keyboard.dismiss()

    props.getRegion({
      location: {
        coords: {
          latitude: place.result.geometry.location.lat,
          longitude: place.result.geometry.location.lng
        },
        boundingBox: {
          northeast: place.result.geometry.viewport.northeast,
          southwest: place.result.geometry.viewport.southwest
        }
      },
      position: position,
      getLocationName: false
    })
  }

  return (
    <MotiView
      from={{ height: (Dimensions.get('window').height * 20) / 100, marginHorizontal: 10 }}
      animate={{
        height: props.startingPoint && props.destination ? (Dimensions.get('window').height * 5) / 100 : (Dimensions.get('window').height * 20) / 100,
      }}
      transition={{ type: 'timing', delay: 1000 }}
    >
      <KeyboardAvoidingView>
        <MotiView
          style={styles.row}
          from={{ opacity: 1 }}
          animate={{ opacity: props.startingPoint && props.destination ? 0 : 1 }}
          transition={{ type: 'timing', delay: 700 }}
        >
          <Image source={startingPointPin} style={styles.icon} />
          <PlacesInput
            googleApiKey={mapKey['map-key']}
            onSelect={place => setPlace(place, 'starting-point')}
            stylesContainer={{ ...styles.placesSearchContainer, zIndex: 1 }}
            stylesInput={styles.placesSearchInput}
            placeHolder={props.nameOfUserLocation ? props.nameOfUserLocation : 'Search for starting point'}
            stylesList={styles.placesResultsList}
            stylesItemText={{ color: theme['muted-white'] }}
            textInputProps={{ placeholderTextColor: theme['muted-white'] }}
            queryCountries={['RW']}
          />
        </MotiView>
        <MotiView
          style={styles.row}
          from={{ opacity: 1 }}
          animate={{ opacity: props.startingPoint && props.destination ? 0 : 1 }}
          transition={{ type: 'timing', delay: 350 }}
        >
          <Image source={destinationPin} style={styles.icon} />
          <PlacesInput
            googleApiKey={mapKey['map-key']}
            onSelect={place => setPlace(place, 'destination')}
            stylesContainer={{ ...styles.placesSearchContainer, zIndex: 0 }}
            stylesInput={styles.placesSearchInput}
            placeHolder='Search destination'
            stylesList={styles.placesResultsList}
            stylesItemText={{ color: theme['muted-white'] }}
            textInputProps={{ placeholderTextColor: theme['accent'] }}
            queryCountries={['RW']}
          />
        </MotiView>
      </KeyboardAvoidingView>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 72,
    resizeMode: 'contain'
  },
  placesSearchContainer: {
    width: 340,
    marginLeft: 30,
  },
  placesSearchInput: {
    backgroundColor: theme['background'],
    borderWidth: 1,
    borderColor: theme['muted-white'],
    backgroundColor: theme['background'],
    color: theme['muted-white'],
    borderRadius: 10
  },
  placesResultsList: {
    backgroundColor: theme['background']
  }
})

export default LocationSet