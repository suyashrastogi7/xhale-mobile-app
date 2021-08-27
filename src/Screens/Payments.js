import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {URI} from "@env"

const Payments = ({navigation, route}) => {
    return(
        <View style={styles.container}>
            <Text>Payments Page</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container : {
        backgroundColor : "#fff",
        width : "100%",
        height : "100%",
        textAlign : "center",
        justifyContent : "center",
        alignItems : "center"
    }
})

export default Payments;