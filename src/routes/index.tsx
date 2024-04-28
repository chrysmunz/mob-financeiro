import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Register } from '../screens';

export type StackParamList = {
    List: undefined;
    Register: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const Navigator: React.FC = () => (
    <Stack.Navigator initialRouteName='List' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='List' component={Home} />
        <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
);

export default Navigator;
