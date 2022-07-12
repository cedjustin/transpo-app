import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import PlacesInput from 'react-native-places-input';
import mapKey from './keys/map-key.json'

const Test = () => {
    return (
        <View>
            <PlacesInput
                googleApiKey={mapKey['map-key']}
                onSelect={place => console.log(place)}
            />
        </View>
    )
}

export default Test