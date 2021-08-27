import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";

const Header = ({navigation}) => 
{
    return(
        <View style={styles.container}>

            <Text style={styles.heading}>Order Details</Text>
        </View>
    );
}


const styles = StyleSheet.create(
    {
        container : {
            height : 'auto',
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'center',
            textAlign : 'center',
            position : 'relative',
            backgroundColor : '#2B2B2B',
            width : '100%',
            flexWrap : 'wrap',
            flexDirection : 'row',
            elevation : 10,
            opacity : 1,

        },
        heading : {
            color : '#fff',
            fontSize : 19,
            margin : 20,
            textAlign : 'center',
            justifyContent : "center"
            
        },
        search : {
            justifyContent : "center",
            textAlign : 'center',
            position : 'relative',
            right : -100
        }

    }
);

export default Header;
