import React from 'react'
import { Dimensions, StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native'
import mapKey from '../keys/map-key.json'
import { default as theme } from '../theme/theme.json';
import PlacesInput from 'react-native-places-input';

//images
import startingPointPin from '../assets/starting-point-pin.png'
import destinationPin from '../assets/destination-pin.png'

const LocationSet = (props) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.row}>
          <Image source={startingPointPin} style={styles.icon} />
          <PlacesInput
            googleApiKey={mapKey['map-key']}
            onSelect={place => {
              props.getRegion({
                location: {
                  coords: {
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng
                  }
                },
                position: 'starting-point',
                getLocationName: false
              })
            }}
            stylesContainer={{ ...styles.placesSearchContainer, zIndex: 1 }}
            stylesInput={styles.placesSearchInput}
            placeHolder={props.nameOfUserLocation ? props.nameOfUserLocation : 'Search for starting point'}
            stylesList={styles.placesResultsList}
            stylesItemText={{ color: theme['muted-white'] }}
            textInputProps={{ placeholderTextColor: theme['muted-white'] }}
            queryCountries={['RW']}
          />
        </View>
        <View style={styles.row}>
          <Image source={destinationPin} style={styles.icon} />
          <PlacesInput
            googleApiKey={mapKey['map-key']}
            onSelect={place => {
              props.getRegion({
                location: {
                  coords: {
                    latitude: place.result.geometry.location.lat,
                    longitude: place.result.geometry.location.lng
                  }
                },
                position: 'destination',
                getLocationName: false
              })
            }}
            stylesContainer={{ ...styles.placesSearchContainer, zIndex: 0 }}
            stylesInput={styles.placesSearchInput}
            placeHolder='Search destination'
            stylesList={styles.placesResultsList}
            stylesItemText={{ color: theme['muted-white'] }}
            textInputProps={{ placeholderTextColor: theme['accent'] }}
            queryCountries={['RW']}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: (Dimensions.get('window').height * 20) / 100,
  },
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