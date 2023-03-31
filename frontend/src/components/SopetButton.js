import React from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';import color from '../constants/color';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SopetButton = (props) => {

    return (
        <TouchableOpacity
            style={{
                width: props.width ? props.width : '20%',
                height: props.height ? props.height : 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 1000,
                backgroundColor: props.backgroundColor ? props.backgroundColor : color.sopetDarkBrown,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
                elevation: 3
            }}
            onPress={props.onPress}
        >
            <Text style={{fontFamily: 'Kanit-Light', color: 'white'}}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

export default SopetButton;