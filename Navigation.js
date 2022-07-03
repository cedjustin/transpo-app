import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Views/Login';
import Signup from './Views/Signup';
import { default as theme } from './theme/theme.json';

const Navigation = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer theme={{colors:{background: theme['background']}}}>
            <Stack.Navigator>
                <Stack.Screen
                    name='login'
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='signup'
                    component={Signup}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation