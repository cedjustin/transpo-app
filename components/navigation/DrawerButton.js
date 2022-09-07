import { Button, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native';

//images
import menu from '../../assets/menu.png'

const DrawerButton = (props) => {

    const toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    return (
        <View style={{ height: (Dimensions.get('window').height * 5) / 100 }}>
            <Button
                appearance='ghost'
                style={styles.button}
                onPress={() => toggleDrawer()}
            >
                {() => <Image source={menu} style={styles.menuIcon} />}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
    menuIcon: {
        width: 30,
        resizeMode: 'contain'
    }
})

export default DrawerButton