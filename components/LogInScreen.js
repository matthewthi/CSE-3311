import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import Functions from './Functions'
import styles from './Styles'

class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
        }
    }

    postLoginData() {
        fetch('https://event-maps-api.herokuapp.com/user/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.userName,
            password: this.state.password,
          })
        }).then((response) => response.json()).then((responseJSON) => {
            let result = responseJSON;

            if(result.successful == true) {
                console.log("postLogin true");

                this.props.navigation.navigate('Map', {userName: this.state.userName});
            }
        }).catch((error) => {
          console.error(error);
        });
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text>Events-Map</Text>
                <TextInput 
                    style = {styles.input}
                    placeholder = "Username"
                    onChangeText = {(userName) => this.setState({userName})}
                    value = {this.state.userName}/>
 
                <TextInput
                    style = {styles.input}
                    placeholder = "Password"
                    onChangeText = { (password) => this.setState({password})}
                    value = {this.state.password}/>

                <View style = {styles.buttonContainer}>
                    <TouchableOpacity 
                        style = {styles.buttonStyle}
                        //onPress = {() => this.props.navigation.navigate('Map', {userName: this.state.userName})}>
                        onPress = { () => this.postLoginData()}>
                    
                        <Text style = {styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.buttonStyle}
                        onPress = {() => this.props.navigation.navigate('Register')}>

                        <Text style = {styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LogInScreen;