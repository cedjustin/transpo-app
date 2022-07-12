import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';
import mapKey from '../keys/map-key.json'
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Dimensions, Image } from 'react-native';
import mapTheme from '../theme/map.json'

//images
import myLocationPin from '../assets/my-location-pin.png'

const Map = () => {

    const [region, setRegion] = useState(null)
    const [destination, setDestination] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);

    const getRegion = (location) => {

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

        setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta
        })

    }


    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                getRegion(location);
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            customMapStyle={mapTheme}
            showsBuildings={true}
            showsIndoors={true}
            scrollEnabled={false}
            zoomEnabled={false}
        >
            {region ? <Marker
                key="location"
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                tappable={false}
            >
                <Image source={myLocationPin} style={styles.mapPin} />
            </Marker> : <></>}
            {destination ? <Marker
                key="destination"
                coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
            /> : <></>}
            {region && destination ?
                <MapViewDirections
                    origin={{ latitude: region.latitude, longitude: region.longitude }}
                    destination={{ latitude: destination.latitude, longitude: destination.longitude }}
                    apikey={mapKey['map-key']} // insert your API Key here
                    strokeWidth={4}
                    strokeColor="#111111"
                /> : <></>
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: ((Dimensions.get('window').height*70)/100)+20,
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