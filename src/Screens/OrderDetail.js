import React, {useState} from 'react'
import {View, Text ,StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import { useEffect } from 'react/cjs/react.development';
import getDirections from 'react-native-google-maps-directions'
import {URI, ACCESS_TOKEN} from "@env"

import { Table, Row, Rows} from 'react-native-table-component';

//Components
import Header from '../Components/Header';

let ScreenHeight = Dimensions.get("window").height;  

const OrderDetails = ({navigation, route}) => {

    const [detail, setDetail] = useState([{hookahSize : '', hookahId : '', hookahFlavor : '', hookahPrice : '', delivered : false, collected : false, in_use : false}])
    const [delivered, setDelivered] = useState(detail.delivered)

    const data = {
        _id : route.params._id, 
        hookah : route.params.hookah,
    }

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0);

    const tableHead = ['Hookah Size', 'Hookah ID', 'Flavor', 'Price'];
    const tableData = [[detail[0].hookahSize, detail[0].hookahId, detail[0].hookahFlavor, detail[0].hookahPrice]]

    const handleDelivered = async (props) => {
        await fetch(`${URI}/update-order/${data._id}/${props}`,{ 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            }).then(() => {
                setDelivered(true);
            })
            .catch(err => {
                console.log(err)
            });
        }

    const getGeoCode = async () => {
        // const address = `${detail[0].houseNumber}%20${detail.street_name}%20${detail[0].area_name}%20Lucknow%20Uttar%20Pradesh%20IN%20${detail.pincode}`
        const address = `B-47 Sector-C Aliganj Lucknow Uttar Pradesh IN`
        console.log(address)
        await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${ACCESS_TOKEN}`, {
            method : 'GET',
            mode : 'cors',
            credentials : 'same-origin',
            headers : {
                'Content-Type': 'application/json'
            },
            redirect : 'follow',
            referrerPolicy : 'no-referrer'
        })
        .then(res => {
            res.json().then(result => {
                console.log(result)
                setLatitude(result.results[0].position.lat)
                setLongitude(result.results[0].position.lon)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }


    const handleGetDirections = async () => {
        await getGeoCode().then(() => {
            const data = {
                destination: {
                 latitude: latitude,
                 longitude: longitude
                },
                params: [
                 {
                   key: "travelmode",
                   value: "driving"        // may be "walking", "bicycling" or "transit" as well
                 },
                 {
                   key: "dir_action",
                   value: "navigate"       // this instantly initializes navigation using the given travel mode
                 }
                ]
            }
            console.log(data)
            getDirections(data)
        })
        
    }

    const handlePayment = () => {
        navigation.navigate('payments', {
            _id : route.params._id,
        })
    }

    useEffect(() => {
        async function getOrderDetail() {
            await fetch(`${URI}/order/${data._id}`,{ 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body : data
            }).then(res => {
                res.json()
                .then(result => {
                    setDetail(result)
                    console.log(detail)
                })
            })
            .catch(err => {
                console.log(err)
            });
        }
        getOrderDetail();
    },[])

    return(
        <View>
            <Header />
            <View style={styles.box}>
                <View style={styles.card}>
                    {detail.map((item,i) => {
                        return(
                            <View style={styles.text} key={i}>
                                <Text style={{fontSize : 15}}>For : </Text>
                                <Text style={styles.text} >{item.first_name} {item.last_name}</Text>
                                <Text style={styles.text}>{item.houseNumber}</Text>
                                <Text style={styles.text}>{item.street_name}</Text>
                                <Text style={styles.text}>{item.area_name}, {item.pincode}</Text>
                                <View style={styles.table}>
                                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                        <Row data={tableHead} style={styles.head} textStyle={styles.textTable}/>
                                        <Rows data={tableData} textStyle={styles.textTable}/>
                                    </Table>
                                </View>
                            </View>
                        )
                    })}

                    <View style={styles.updater} >
                        <TouchableOpacity style={styles.button2} onPress={handleGetDirections}>
                            <Text style={{color : 'white'}}>Get Directions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={handlePayment}>
                            <Text style={{color : 'white'}}>Take Payment</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.updater}>
                        <TouchableOpacity style={styles.button} onPress={() => handleDelivered('delivered')}>
                            <Text>Delivered</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleDelivered('in_use')}>
                            <Text>In Use</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleDelivered('collected')}>
                            <Text>Collected</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container : {
        backgroundColor : "#fff",
        width : "100%",
        height : "100%",
        textAlign : "left",
        padding : 10,
    },
    box : {
        padding : 15,
        backgroundColor : '#f5fcff',
        height : ScreenHeight
    },
    card : {
        width : '100%',
        padding : 20,
        borderRadius : 10,
        marginVertical : 5,
        backgroundColor : '#fff',
        height : ScreenHeight-100
    },
    text : {
        fontSize : 20,
        marginVertical : -2
    },
    updater : {
        display : 'flex', 
        width : '100%',
        flexDirection : 'row', 
        justifyContent : 'space-between',
    },
    button : {
        paddingHorizontal : 25,
        paddingVertical : 10,
        borderRadius : 5,
        backgroundColor : '#93e077',
        textAlign : 'center',
        marginVertical : 10,
    },
    button2 : {
        paddingHorizontal : 25,
        paddingVertical : 10,
        borderRadius : 5,
        backgroundColor : '#006ee6',
        textAlign : 'center',
        marginVertical : 10,
        color : 'white'
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    textTable: { margin: 6 },
    table : {
        marginVertical : 20
    }
})

export default OrderDetails;