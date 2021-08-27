import React, {useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, RefreshControl, TouchableOpacity} from 'react-native'
import {URI} from "@env"

const CompletedOrders = () => {

    const [orders,setOrders] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        async function getCompletedOrders(){
            await fetch(`${URI}/completed-order`,{ 
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            }).then(res => {
                res.json()
                .then(result => {
                    setOrders(result)
                })
            })
            .catch(err => {
                console.log(err)
            });
        }
        getCompletedOrders();
    })


    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await fetch(`${URI}/completed-order`,{ 
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }).then(res => {
            res.json()
            .then(result => {
                setOrders(result)
                setRefreshing(false)
            })
        })
        .catch(err => {
            console.log(err)
        });
    },[refreshing])

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <Text>All Pending orders</Text>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {orders.map((item,i) => {
                    return(
                        <TouchableOpacity style={styles.card} key={i}>
                            <Text style={{fontWeight : '800'}} >{item.first_name} {item.last_name}</Text>
                            <Text>{item.houseNumber}, {item.street_name}, {item.area_name}, {item.pincode}</Text>
                            <Text>Hookah Size : {item.hookahSize}-{item.hookahId}</Text>
                            <Text>Flavour : {item.hookahFlavor}</Text>
                            <Text>Price to Collect : {item.hookahPrice}</Text>
                        </TouchableOpacity>
                    )
                })}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text : {
        fontSize : 30,
        color : "#ffffff",
        // fontFamily : "SFProDisplay-Regular",
    },
    container : {
        backgroundColor : "#fff",
        width : "100%",
        height : "100%",
        textAlign : "left",
        padding : 10,
    },
    box : {
        //boxShadow: '0 10px 6px -6px #777'
        elevation : 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        padding : 15,
        backgroundColor : '#f5fcff',
        height : '100%'
    },
    card : {
        width : '100%',
        height : 'auto',
        padding : 20,
        borderRadius : 10,
        elevation : 0,
        marginVertical : 5,
        backgroundColor : '#fff'
    }
});


export default CompletedOrders;