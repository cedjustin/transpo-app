import { Text } from '@ui-kitten/components'
import React from 'react'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import mapKey from '../keys/map-key.json'
import { default as theme } from '../theme/theme.json';

//images
import startingPointPin from '../assets/starting-point-pin.png'
import destinationPin from '../assets/destination-pin.png'

const LocationSet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={startingPointPin} style={styles.icon} />
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: mapKey,
            language: 'en',
          }}
          styles={styles.input}
        />
      </View>
      <View style={styles.row}>
        <Image source={destinationPin} style={styles.icon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 10,
    height: (Dimensions.get('window').height * 20) / 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    height: '50%',
    alignItems: 'center'
  },
  icon: {
    width: 25,
    resizeMode: 'contain'
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    backgroundColor: theme['background']
}
})

export default LocationSet