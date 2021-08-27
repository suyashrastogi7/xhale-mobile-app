import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//SCREENS
import Orders from '../Screens/Orders';
import CompletedOrders from '../Screens/CompletedOrders';
import Payments from '../Screens/Payments';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
      <Tab.Navigator initialRouteName="Orders" screenOptions={{tabBarItemStyle : {paddingTop : 3,paddingBottom : 3 ,marginTop : -1, marginBottom : -1}}}>
        <Tab.Screen 
          name="Orders" 
          component={Orders}     
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name ="cart-outline" color={color} size={25} />
            )
          }}  
           />
        <Tab.Screen 
          name="Completed Orders" 
          component={CompletedOrders}     
          options={{
            tabBarLabel: 'Completed Orders',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name ="receipt" color={color} size={25} />
            )
          }}  
           />
        <Tab.Screen 
          name="Payments" 
          component={Payments}     
          options={{
            tabBarLabel: 'Payments',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name ="credit-card-outline" color={color} size={25} />
            )
          }}  
           />
      </Tab.Navigator>
    );
  }

  export default TabNav;