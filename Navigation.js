import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { default as theme } from './theme/theme.json';

// pages
import Login from './Views/Login';
import Signup from './Views/Signup';
import Index from './Views/Index'
import Settings from './Views/Settings';

const Navigation = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const Stack = createNativeStackNavigator()
    const Drawer = createDrawerNavigator()

    const customTheme = {
        dark: true,
        colors:{
            ...theme
        }
    }

    return (
        <NavigationContainer theme={customTheme}>
            {isLoggedIn ?
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
                </Stack.Navigator> :
                <Drawer.Navigator>
                    <Drawer.Screen name='index' component={Index} options={{ headerShown: false }} />
                    <Drawer.Screen name='settings' component={Settings} options={{ headerShown: false }} />
                </Drawer.Navigator>
            }
        </NavigationContainer>
    )
}

export default Navigation