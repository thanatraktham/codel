import React, { useState } from 'react'
import {Animated, Dimensions, Image, ImageBackground, Keyboard, Modal, Platform, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../constants/color';
import device from '../constants/device';
import NavBar from '../components/NavBar';

import loginBackground from '../assets/pages/loginBackground.png'

import testImg from '../assets/images/testImg.png'

import TestScreen from './TestScreen';
import { ScrollView } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function AboutUsScreen({ navigation }) {

    return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: color.sopetMediumBrown}}>
                    <NavBar
                        title='เกี่ยวกับเรา'
                        navigation={navigation}
                    />
                </View>

                <View style={{flex: 12, backgroundColor: 'white'}}>
                    <ScrollView
                        style={{margin: '10%'}}
                    >
                        <Text style={{fontFamily: 'Kanit-Light', fontSize: 18}}>
                            SOPet คือสตาร์ทอัพภายใต้การสนับสนุนจาก จุฬาลงกรณ์มหาวิทยาลัยและสถาบันนวัตกรรมบูรณาการ จุฬาลงกรณ์มหาวิทยาลัย(ScII) ก่อตั้งขึ้นในปี 2020{'\n'}{'\n'}
                            SOPetมีเป้าหมายในการช่วยเหลือสัตว์และเจ้าของให้สามารถเข้าถึงบริการทางสุขภาพเบื้องต้นของสัตว์ได้อย่างรวดเร็วและมีประสิทธิผลด้วยการให้บริการปรึกษาทางไกล(Teleconsultaion) เกี่ยวกับสัตว์เลี้ยงผ่านการถาม-ตอบคำถามโดยตรงกับสัตวแพทย์แบบเรียลไทม์ โดยมี 3 บริการหลัก คือ แชท คอล และวิดีโอคอล ซึ่งครอบคลุมสัตว์หลายประเภท ประกอบไปด้วย สัตว์เลี้ยงทั่วไป สัตว์แปลก(Exotic pet) สัตว์น้ำ สัตว์ป่า และสัตว์ประเภทอื่นๆ{'\n'}{'\n'}

                            ประโยชน์ของการปรึกษาสัตวแพทย์ออนไลน์ผ่าน SOPet สัตวแพทย์สามารถ{'\n'}{'\n'}

                            1. ประเมินความจำเป็นและความเร่งด่วนในการพาสัตว์เลี้ยงไปพบสัตวแพทย์ที่โรงพยาบาลหรือคลินิก{'\n'}
                            2. แนะนำการดูแลเบื้องต้นก่อนพาสัตว์เลี้ยงไปตรวจกับสัตแพทย์หรือระหว่างเฝ้าดูอาการ{'\n'}
                            3. วิเคราะห์สาเหตุของอาการที่เป็นไปได้ตามลักษณะอาการที่ได้รับแจ้ง{'\n'}
                            4. ตอบคำถามหรือให้ข้อมูลอื่นๆ{'\n'}{'\n'}

                            *สัตวแพทย์ไม่สามารถยืนยันหรือวินิจฉัยใดๆได้{'\n'}
                        </Text>
                        <Text style={{textAlign: 'center',
                            marginVertical: '3%',
                            fontFamily: 'Kanit-Medium',
                            fontSize: 30}}
                        >
                            FAQ
                        </Text>
                        
                        <View style={{flexGrow: 1,
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: color.sopetMediumBrown}}
                        >
                            <Text style={{paddingHorizontal: '8%',
                                paddingTop: '5%',
                                fontFamily: 'Kanit-Light',
                                fontSize: 24,}}
                            >
                                Q: SOPet คือใคร
                            </Text>
                            <View style={{flexGrow: 1,
                                borderRadius: 10,
                                margin: '5%',
                                backgroundColor: color.sopetLightBrown}}
                            >
                                <Text style={{padding: '5%', fontFamily: 'Kanit-Light', fontSize: 18}}>
                                A: SOPet เป็นสตาร์ทอัพที่นำเทคโนโลยีการปรึกษาทางไกล (Teleconsultation) มาผสมผสานกับการปรึกษาสัตวแพทย์ออนไลน์ผ่านระบบแอปพลิเคชันเพื่อให้สัตวแพทย์และท่านเจ้าของสัตว์เลี้ยงสามารถพูดคุยตอบโต้กันได้แบบ Real-time ผ่านบริการแชท, โทร และวิดีโอคอล อย่างไร้ข้อจำกัดในเรื่องเวลาและสถานที่{'\n'}{'\n'}


                                ปัจจุบัน (พฤษภาคม 2564) เรามีผู้ใช้บริการมากกว่า 1,300 ท่านและเพิ่มขึ้นอย่างก้าวกระโดด โดยมีสัตวแพทย์ผู้เชี่ยวชาญตัวจริงในการให้
                                การปรึกษา
                                </Text>
                            </View>
                        </View>
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
    containerHeader: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: '5%',
        paddingTop: device.iPhoneNotch ? 60 : 36,
        backgroundColor: color.sopetLightBrown,
        zIndex: 10
    },
    inputBox: {
        width: WIDTH * 0.86,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'Kanit-Light',
        paddingHorizontal: 20,
        borderRadius: 40,
        backgroundColor: 'white',
    }
  });