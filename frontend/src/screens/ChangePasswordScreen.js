import React, { useState } from 'react'
import {Animated, Dimensions, Image, ImageBackground, Keyboard, Modal, Platform, StyleSheet, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../constants/color';
import device from '../constants/device';
import NavBar from '../components/NavBar';
import SopetButton from '../components/SopetButton';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const EditBox = (props) => {
    return (
        <View style={{flexDirection: 'row', marginVertical: '2%'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Kanit-Light'}}>
                    {props.itemName}
                </Text>
            </View>
            <View style={{flex: 3}}>
                <TextInput style={styles.inputBox}
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoCompleteType={'off'}
                    keyboardType={props.keyboardType}
                    secureTextEntry={props.secureTextEntry }
                />
            </View>
        </View>
    )
}

export default function ChangePasswordScreen({ navigation }) {

    const [oldPass, setOldPass] = useState("123456")
    const [newPass, setNewPass] = useState("")
    const [confirmNewPass, setConfirmNewPass] = useState("")
    const [hidePass, setHidePass] = useState(true)

    return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: color.sopetMediumBrown}}>
                    <NavBar
                        title='เปลี่ยนรหัสผ่าน'
                        navigation={navigation}
                    />
                </View>

                <View style={{flex: 12, backgroundColor: 'white'}}>
                    <ScrollView
                        style={{margin: '5%', alignContent: 'center'}}
                    >
                        <EditBox
                            itemName="รหัสผ่านเก่า"
                            defaultValue={oldPass}
                            onChangeText={(text) => setOldPass(text)}
                            secureTextEntry={hidePass}
                        />
                        <EditBox
                            itemName="รหัสผ่านใหม่"
                            defaultValue={newPass}
                            onChangeText={(text) => setOldPass(text)}
                            secureTextEntry={hidePass}
                        />
                        <EditBox
                            itemName="ยืนยันรหัสผ่าน"
                            defaultValue={confirmNewPass}
                            onChangeText={(text) => setOldPass(text)}
                            secureTextEntry={hidePass}
                        />

                        <View style={{alignItems: 'center', marginVertical: '10%'}}>
                            <SopetButton
                                text="ยืนยัน"
                            />
                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'Kanit-Light',
        paddingHorizontal: '3%',
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  });