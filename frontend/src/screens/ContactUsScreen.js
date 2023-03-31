import React, { useState } from 'react'
import {
    Dimensions,
    Image,
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import color from '../constants/color';
import NavBar from '../components/NavBar';

import line from '../assets/images/line.png'
import gmail from '../assets/images/gmail.png'
import facebook from '../assets/images/facebook.png'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var keyIndex = 0;

const createKeyIndex = () => {
    var _keyIndex = keyIndex;
    keyIndex++;
    return _keyIndex;
}

const createVerticalBox = (contactList) => {
    return (
        contactList.map((e) => {
            return (
                <TouchableOpacity key={e.id} style={styles.contactItem} onPress={()=>{Linking.openURL(e.url)}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 2, aspectRatio: 1}}>
                            <Image source={e.img} style={{flex: 1, aspectRatio: 1}}/>
                        </View>
                        <View style={{flex: 7, justifyContent: 'center'}}>
                            <Text style={{
                                paddingHorizontal: '10%',
                                textAlignVertical: 'center',
                                fontFamily: 'Kanit-Light',
                            }}>
                                {e.description}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    )
}

export default function ContactUsScreen({ navigation }) {

    const [contactList, setContactList] = useState([
        {   
            id: createKeyIndex(),
            img: facebook,
            description: 'SOPet.co ปรึกษาสัตวแพทย์ออนไลน์แบบทันทีกับสัตวแพทย์ตัวจริง',
            url: "https://www.facebook.com/sopetofficial"
        },
        {   
            id: createKeyIndex(),
            img: line,
            description: 'SOPet.co ปรึกษาสัตวแพทย์ออนไลน์แบบทันทีกับสัตวแพทย์ตัวจริง',
            url: "line"
        },
        {   
            id: createKeyIndex(),
            img: gmail,
            description: 'sopetofficial@gmail.com',
            url: "mailto:sopetofficial@gmail.com"
        },
    ])

    return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: color.sopetMediumBrown}}>
                    <NavBar
                        title='ติดต่อเรา'
                        navigation={navigation}
                    />
                </View>
                <View style={{flex: 12, backgroundColor: color.sopetLightBrown}}>
                    <ScrollView
                        style={{margin: '10%'}}
                    >
                        {createVerticalBox(contactList)}
                    </ScrollView>
                </View>

            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    iPhoneNotch: {
        height: 44,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 20
    },
    contactItem: {
        height: 120,
        justifyContent: 'center',
        padding: '5%',
        marginVertical: '5%',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 6,
    }
  });