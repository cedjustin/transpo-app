import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Back from '../components/navigation/Back';
import { default as theme } from '../theme/theme.json';

// images
import SignupForm from '../assets/signup-form.png'
import { Button, Input, Text } from '@ui-kitten/components';

const Signup = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('+250');
    const [phoneNumberError, setPhoneNumberError] = useState(false)
    const [pinNumber, setPinNumber] = useState('');
    const [pinNumberError, setPinNumberError] = useState(false)
    const [confirmPinNumber, setConfirmPinNumber] = useState('');
    const [confirmPinNumberError, setConfirmPinNumberError] = useState(false)

    const pinNumberRef = useRef(null)
    const confirmPinNumberRef = useRef(null)

    const signup = async () => {
        phoneNumber == '+250' || '' || phoneNumber.length < 13 ? setPhoneNumberError(true) : setPhoneNumberError(false)
        pinNumberError == '' || pinNumber.length != 4 ? setPinNumberError(true) : setPinNumberError(false)
        confirmPinNumberError == '' || confirmPinNumber.length != 4 ? setConfirmPinNumberError(true) : setConfirmPinNumberError(false)
    }

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
                        onChangeText={nextValue => {
                            phoneNumberError ? setPhoneNumberError(false) : void (0)
                            setPhoneNumber(nextValue)
                        }}
                        style={styles.input}
                        size='large'
                        keyboardType='number-pad'
                        textStyle={{ color: phoneNumberError ? theme['danger'] : '#fff' }}
                        onSubmitEditing={() => pinNumberRef.current.focus()}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text category='h5'>Pin number</Text><Text>4 numbers</Text>
                    </View>
                    <Input
                        placeholder='Enter pin number'
                        value={pinNumber}
                        onChangeText={nextValue => {
                            pinNumberError ? setPinNumberError(false) : void (0)
                            pinNumber.length <= 4 ? setPinNumber(nextValue) : void (0)
                        }}
                        style={styles.input}
                        size='large'
                        keyboardType='number-pad'
                        textStyle={{ color: pinNumberError ? theme['danger'] : '#fff' }}
                        ref={pinNumberRef}
                        onSubmitEditing={() => confirmPinNumberRef.current.focus()}
                    />
                    <Text category='h5'>Confirm Pin number</Text>
                    <Input
                        placeholder='Enter pin number'
                        value={confirmPinNumber}
                        onChangeText={nextValue => {
                            confirmPinNumberError ? setConfirmPinNumberError(false) : void (0)
                            confirmPinNumber.length <= 4 ? setConfirmPinNumber(nextValue) : void (0)
                        }}
                        style={styles.input}
                        size='large'
                        keyboardType='number-pad'
                        textStyle={{ color: confirmPinNumberError ? theme['danger'] : '#fff' }}
                        ref={confirmPinNumberRef}
                    />
                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button
                        style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
                        onPress={() => { signup() }}
                    >
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