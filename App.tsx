import React from 'react';
import * as eva from '@eva-design/eva';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { theme } from './src/theme';
import Navigator from './src/routes';

function App(): React.JSX.Element {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <ThemeProvider theme={theme}>
                <IconRegistry icons={EvaIconsPack} />
                <NavigationContainer>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Navigator />
                    </SafeAreaView>
                </NavigationContainer>
            </ThemeProvider>
        </ApplicationProvider>
    );
}

export default App;
