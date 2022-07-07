import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Back from '../components/navigation/Back';
import { default as theme } from '../theme/theme.json';

// images
import SignupForm from '../assets/signup-form.png'
import { Button, Input, Text } from '@ui-kitten/components';

const Signup = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('+250');
    const [pinNumber, setPinNumber] = useState('');
    const [confirmPinNumber, setConfirmPinNumber] = useState('');

    const goToLogin = () => {
        navigation.navigate('login')
    }

    return (
        <ScreenWrapper>
            <Back navigation={navigation} />
            <View style={styles.centeredRow}>
                <Image source={SignupForm} style={styles.topImage} />
            </View>
            <View style={{ marginHorizontal: 40 }}>
                <Text category='h3'>Signup</Text>
                <Text style={{ color: theme['muted-white'] }}>Start your journey of working smart</Text>
                <View style={{ marginTop: 20 }}>
                    <Text category='h5'>Phone number</Text>
                    <Input
                        placeholder='Enter phone number'
                        value={phoneNumber}
                        onChangeText={nextValue => setPhoneNumber(nextValue)}
                        style={styles.input}
                        size='large'
                        keyboardType='number-pad'
                    />
                    <Text category='h5'>Pin number</Text>
                    <Input
                        placeholder='Enter pin number'
                        value={pinNumber}
                        onChangeText={nextValue => setPinNumber(nextValue)}
                        style={styles.input}
                        size='large'
                        keyboardType='number-pad'
                    />
                    <Text category='h5'>Confirm Pin number</Text>
                    <Input
                        placeholder='Enter pin number'
                        value={confirmPinNumber}
                        onChangeText={nextValue => setConfirmPinNumber(nextValue)}
                        style={styles.input}
                        size='large'
                        keyboardType='number-pad'
                    />
                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button style={{ backgroundColor: theme.primary, borderColor: theme.primary }}>
                        {() => <Text style={{ color: '#000' }}>
                            SIGNUP
                        </Text>}
                    </Button>
                </View>
                <Button appearance='ghost' onPress={() => goToLogin()}>
                    {() => <Text style={{ color: theme['muted-white'] }}>
                        Or LOGIN
                    </Text>}
                </Button>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    centeredRow: { flexDirection: 'row', justifyContent: 'center' },
    topImage: {
        width: Dimensions.get('screen').width / 0.5,
        resizeMode: 'contain',
        height: 100,
        marginBottom: 30,
        marginVertical: 40
    },
    input: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme['muted-white'],
        backgroundColor: theme['background']
    }
})

export default Signup