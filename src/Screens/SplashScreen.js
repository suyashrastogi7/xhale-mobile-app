import React, {useEffect} from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";


const SplashScreen = ({navigation}) =>
{
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Tab");
        }, 2000)
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar hidden />
            <Text style={styles.text}>XHALE</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    text : {
        fontSize : 30,
        color : "#ffffff",
        // fontFamily : "SFProDisplay-Regular",
    },
    container : {
        backgroundColor : "#171717",
        width : "100%",
        height : "100%",
        textAlign : "center",
        justifyContent : "center",
        alignItems : "center"
    }
});

export default SplashScreen;
