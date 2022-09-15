import { Button, Text } from '@ui-kitten/components'
import { MotiView } from 'moti'
import React from 'react'
import { Dimensions, FlatList, StyleSheet, View, Image } from 'react-native'
import { default as theme } from '../theme/theme.json';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import transportData from '../data/transport-types.json'

const itemSize = Dimensions.get('window').width / 3

const TransportationSet = (props) => {

    const resetDestination = () => {
        props.setDestination(null)
    }

    const calculateDistanceCost = (cost)=>{
        const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: Math.round((props.distance/1000) * cost), code: 'USD' })
        if(!props.locationSetOpen) return valueFormattedWithoutSymbol
    }

    return (
        <MotiView
            style={styles.container}
            from={{ top: 0 }}
            animate={{ top: props.startingPoint && props.destination ? -250 : 0 }}
            transition={{ type: 'timing', delay: 1000 }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button
                    onPress={() => resetDestination()}
                    size='medium'
                    appearance='ghost'>{() => <Text style={{ color: theme['muted-white'] }}>
                        Change destination
                    </Text>}
                </Button>
            </View>
            <FlatList
                data={transportData}
                horizontal
                snapToInterval={itemSize}
                contentContainerStyle={{ alignItems: 'center' }}
                decelerationRate={0}
                bounces={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Image source={{ uri: item.icon }} style={{ width: 50, height: 50 }} />
                            </View>
                            <Text style={{ color: theme['muted-white'] }}>{item.name}</Text>
                            <Text style={{ color: theme['muted-white'] }}>{calculateDistanceCost(item.cost)} {"RWF"}</Text>
                        </View>
                    </View>
                )}
            />
        </MotiView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 20,
        zIndex: 1,
        backgroundColor: theme['background']
        // top: -10
    },
    card: {
        width: itemSize,
        height: itemSize,
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 15,
        backgroundColor: theme['dark-accent'],
        justifyContent:'center'
    }
})

export default TransportationSet