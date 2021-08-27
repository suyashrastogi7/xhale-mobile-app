import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";

import TabNav from "./src/Components/TabNav";

//SCREENS
import SplashScreen from './src/Screens/SplashScreen';
import OrderDetails from './src/Screens/OrderDetail';

const Stack = createStackNavigator();

const AppStack = () => {
  return(
    <Stack.Navigator initialRouteName="Splash"  screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen
      name="Splash" 
      component={SplashScreen}
    />
    <Stack.Screen
      name="OrderDetails" 
      component={OrderDetails}
      screenOptions={
        {
          headerShown : true
        }
      }
    />
    <Stack.Screen 
      name="Tab" 
      component={TabNav} 
      options={{
        title: 'Xhale',
        headerStyle : 'float',
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
   )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

const App = () =>  {
  return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
  );
}

export default App;