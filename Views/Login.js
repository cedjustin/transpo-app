import { Layout, Text, Input, Button } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { default as theme } from '../theme/theme.json';

// images
import LoginBike from '../assets/login-bike.png'
import Brand from '../assets/brand.png'
import ScreenWrapper from '../components/ScreenWrapper';

const Login = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('+250');
    const [pinNumber, setPinNumber] = useState('');

    const goToSignup = () => {
        navigation.navigate('signup')
    }

    return (
        <ScreenWrapper>
            <View style={{ marginVertical: 100 }}>
                <View style={styles.centeredRow}>
                    <Image source={LoginBike} style={styles.topImage} />
                </View>
                <View style={styles.centeredRow}>
                    <Image source={Brand} style={styles.brandImage} />
                </View>
                <View style={styles.formContainer}>
                    <View>
                        <Text category='h5'>Phone number</Text>
                        <Input
                            placeholder='Enter phone number'
                            value={phoneNumber}
                            onChangeText={nextValue => setPhoneNumber(nextValue)}
                            style={styles.input}
                            size='large'
                            keyboardType='number-pad'
                        />
                    </View>
                    <View>
                        <Text category='h5'>Pin number</Text>
                        <Input
                            placeholder='Enter pin number'
                            value={pinNumber}
                            onChangeText={nextValue => setPinNumber(nextValue)}
                            style={styles.input}
                            size='large'
                            keyboardType='number-pad'
                        />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button style={{ backgroundColor: theme.primary, borderColor: theme.primary }}>
                            {() => <Text style={{ color: '#000' }}>
                                LOGIN
                            </Text>}
                        </Button>
                    </View>
                    <Button appearance='ghost' onPress={() => goToSignup()}>
                        {() => <Text style={{ color: theme['muted-white'] }}>
                            Or SIGNUP
                        </Text>}
                    </Button>
                </View>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: Dimensions.get('window').height,
        justifyContent: 'center'
    },
    centeredRow: { flexDirection: 'row', justifyContent: 'center' },
    topImage: {
        width: Dimensions.get('screen').width / 1.5,
        resizeMode: 'contain',
        height: 100,
        marginBottom: 30
    },
    brandImage: {
        width: 200,
        height: 50,
        resizeMode: 'contain'
    },
    formContainer: {
        paddingHorizontal: 40,
        paddingVertical: 50
    },
    input: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme['muted-white'],
        backgroundColor: theme['background']
    }
})

export default Login