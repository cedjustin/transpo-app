import { Layout } from '@ui-kitten/components'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { default as theme } from '../theme/theme.json';

const ScreenWrapper = (props) => {
    return (
        <Layout style={{ backgroundColor: theme['background'] }}>
            <View style={styles.container}>
                {props.children}
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height
    }
})

export default ScreenWrapper