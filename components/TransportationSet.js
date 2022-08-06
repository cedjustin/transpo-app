import { Text } from '@ui-kitten/components'
import { MotiView } from 'moti'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

const TransportationSet = (props) => {
    return (
        <MotiView
            style={styles.container}
            from={{ height: 0}}
            animate={{ height: props.startingPoint && props.destination ? (Dimensions.get('window').height * 20) / 100 : 0}}
            transition={{ type: 'timing', delay: 1000 }}
        >
            <Text>Hello</Text>
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