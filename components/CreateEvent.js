import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from "./Styles";

class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: null,
            eventDescription: null,
            eventDate: null,
            showCreate: -1
        }
    }

    getEventDetails() {
        let event = {
            name: this.state.eventName,
            description: this.state.eventDescription,
            date: this.state.eventDate
        }

        this.props.getEventDetails(event);
    }

    render() {
        return (
            <View>
            {this.state.showCreate == -1 &&
                <View style = {styles.createEventEntryStyle}>
                    <View style = {styles.createEventEntryHeaderStyle}>
                        <Text style = {styles.createEventTextStyle}>Create</Text>
                    </View>    
            
                    <TextInput
                        style = {styles.input}
                        placeholder = "Event Name"
                        onChangeText = {(name) => this.setState({eventName: name})}
                        value = {this.state.eventName}/>

                    <TextInput
                        style = {styles.input}
                        placeholder = "Description"
                        onChangeText = {(description) => this.setState({eventDescription: description})}
                        value = {this.state.eventDescription}/>

                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                            style = {styles.buttonStyle}
                            onPress = {() => this.setState({showCreate: 1})}>
                            <Text style = {styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>}

            {this.state.showCreate == 1 && 
                <View style = {styles.createEventEntryStyle}>
                    <View style = {styles.createEventEntryHeaderStyle}>
                        <Text style = {styles.createEventTextStyle}>Create</Text>
                    </View>    
            
                    <TextInput
                        style = {styles.input}
                        placeholder = "Time"/>

                    <TextInput
                        style = {styles.input}
                        placeholder = "Date"
                        onChangeText = {(date) => this.setState({eventDate: date})}
                        value = {this.state.eventDate}/>

                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                            style = {styles.buttonStyle}
                            onPress = {() => this.getEventDetails()}>
                            <Text style = {styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            </View>
        );
    }
}

export default CreateEvent;