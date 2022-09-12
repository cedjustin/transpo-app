import { Button, Text } from '@ui-kitten/components'
import { MotiView } from 'moti'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { default as theme } from '../theme/theme.json';

const TransportationSet = (props) => {
    const resetDestination = () => {
        props.setDestination(null)
    }
    return (
        <MotiView
            style={styles.container}
            from={{ height: 0 }}
            animate={{ height: props.startingPoint && props.destination ? (Dimensions.get('window').height * 20) / 100 : 0 }}
            transition={{ type: 'timing', delay: 1000 }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button
                    onPress={() => resetDestination()}
                    size='tiny'
                    appearance='ghost'>{() => <Text style={{ color: theme['muted-white'] }}>
                        Change destination
                    </Text>}
                </Button>
            </View>
        </MotiView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingTop: 10,
        zIndex: 1,
        top: -10
    },
})

export default TransportationSet