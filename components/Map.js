import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';
import mapKey from '../keys/map-key.json'
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Dimensions, Image } from 'react-native';
import mapTheme from '../theme/map.json'
import theme from '../theme/theme.json'

//images
import myLocationPin from '../assets/my-location-pin.png'
import directionsMarker1 from '../assets/directions-marker-1.png'
import directionsMarker2 from '../assets/directions-marker-2.png'

const Map = (props) => {

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                props.getRegion({ location, position: "starting-point", getLocationName: true });
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    return (
        <MapView
            style={styles.map}
            initialRegion={{ ...props.startingPoint, ...props.deltaValues }}
            customMapStyle={mapTheme}
            showsBuildings={true}
            showsIndoors={true}
        >
            {props.startingPoint ? <Marker
                key="location"
                coordinate={{ latitude: props.startingPoint.latitude, longitude: props.startingPoint.longitude }}
                tappable={false}
            >
                {props.destination ? <Image source={directionsMarker1} style={styles.mapPin} /> : <Image source={myLocationPin} style={styles.mapPin} />}
            </Marker> : <></>}
            {props.destination ? <Marker
                key="destination"
                coordinate={{ latitude: props.destination.latitude, longitude: props.destination.longitude }}
            >
                <Image source={directionsMarker2} style={styles.mapPin} />
            </Marker> : <></>}
            {props.startingPoint && props.destination ?
                <MapViewDirections
                    origin={{ latitude: props.startingPoint.latitude, longitude: props.startingPoint.longitude }}
                    destination={{ latitude: props.destination.latitude, longitude: props.destination.longitude }}
                    apikey={mapKey['map-key']} // insert your API Key here
                    strokeWidth={4}
                    strokeColor={theme['accent']}
                /> : <></>
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: ((Dimensions.get('window').height * 70) / 100) + 20,
        zIndex: -1,
        top: -20
    },
    mapPin: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
})

export default Map