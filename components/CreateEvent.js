import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, Dimensions} from 'react-native';

import styles from "./Styles";

const {width, height} = Dimensions.get('window');

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createEvent: null
        }
    }

    handleCreateSelect() {
        this.setState({createEvent: true});

        console.log(this.state.createEvent);
    }

    render() {
        return (
            <View style = {styles.createEventStyle}>
                {this.state.createEvent &&
                    <View style = {styles.createEventEntryStyle}>
                        
                    </View>}

                <TouchableOpacity>
                    <Text style = {styles.createEventTextStyle}>Filters</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => {this.handleCreateSelect()}}>
                    <Text style = {styles.createEventTextStyle}>Create</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style = {styles.createEventTextStyle}>User</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CreateEvent;