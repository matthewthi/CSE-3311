import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './Styles'

class EventDescriptionMarker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Marker
                coordinate = {this.props.coordinate}>

                <View style = {this.props.eventDescriptionCatStyle}>
                    <View style = {styles.eventDescriptionStyle}>
                        <Text 
                            style = {styles.eventDescriptionHeaderStyle}>
                            {this.props.name}
                        </Text>
                
                        <Text 
                            style = {styles.eventDescriptionUserStyle}>
                            {`\tCreated by ${this.props.username}\n`}
                        </Text>
                
                        <Text>{this.props.description}</Text>
                    </View>
                </View>
            </Marker>
        );
    }
}

export default EventDescriptionMarker;