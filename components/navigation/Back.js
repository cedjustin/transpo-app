import { Button, Text } from '@ui-kitten/components'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { default as theme } from '../../theme/theme.json';
import { View, StyleSheet } from 'react-native';

const Back = (props) => {

    const navigateBack = ()=>{
        props.navigation.goBack()
    }

    return (
        <View>
            <Button
                appearance='ghost'
                accessoryLeft={<Ionicons name="chevron-back" size={24} color={theme['muted-white']} />}
                style={styles.button}
                onPress={() => navigateBack()}
            >
                {() => <Text style={{ color: theme['muted-white'] }}>BACK</Text>}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        color: theme['muted-white']
    }
})

export default Back