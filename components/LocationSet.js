import { Text } from '@ui-kitten/components'
import React from 'react'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
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
        // add input here
      </View>
      <View style={styles.row}>
        <Image source={destinationPin} style={styles.icon} />
      </View>
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
    alignItems: 'center'
  },
  icon: {
    width: 25,
    resizeMode: 'contain'
  },
  input: {
    marginVertical: 10,
    textInputContainer: {
      backgroundColor: 'grey',
    },
    textInput: {
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    }
  }
})

export default LocationSet