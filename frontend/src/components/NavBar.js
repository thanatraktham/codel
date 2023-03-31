import React from 'react'
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import color from '../constants/color';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const NavBar = (props) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: '5%',
            backgroundColor: props.backgroundColor ? props.backgroundColor : color.sopetMediumBrown
        }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    { !props.hideNavigation && (
                        <TouchableOpacity
                            style={{justifyContent: 'center'}}
                            onPress={()=>props.navigation.pop()}>
                            <Icon
                                name={'chevron-left'}
                                size={30}
                                style={{alignSelf: 'center'}}
                            />
                        </TouchableOpacity>
                    )}
                    <Text style={{textAlignVertical: 'center',
                        marginHorizontal: '3%',
                        fontFamily: 'Kanit-Medium',
                        fontSize: 24}}
                    >
                        {props.title}
                    </Text>
                </View>
                {props.rightHandContent}
            </View>
        </View>
    );
}

export default NavBar;