import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './core/data/store/store';
import { Provider } from 'react-redux';
import { UserProvider, useUser } from './core/data/contexts/UserContext';

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import MainTabs from './screens/MainTabs';
import AuthenticationStack from './navigators/AuthNavigator';

const AppNavigator = () => {
    const { loggedIn } = useUser();
    return loggedIn ? <MainTabs /> : <AuthenticationStack />;
};

const App = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
        });
        LogBox.ignoreAllLogs(true);
        return unsubscribe;
    }, []);
    return (
        <Provider store={store}>
            <NavigationContainer>
                <UserProvider>
                    <StatusBar translucent={true} style="light" />
                    <AppNavigator />
                </UserProvider>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
