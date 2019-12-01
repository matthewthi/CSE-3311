import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './Styles'

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            password: null,
            email: null
        }
    }

    postUserRegisterData() {
        fetch('https://event-maps-api.herokuapp.com/user/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password,
          })
        }).then((response) => response.json()).then((responseJSON) => {
            let result = responseJSON;

            console.log(responseJSON);
        }).catch((error) => {
          console.error(error);
        });
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.screenBorderStyle}/>
                
                <Text>Register</Text>

                <TextInput
                    style = {styles.input}
                    placeholder = "Username"
                    onChangeText = {(userName) => {this.setState({userName})}}
                    value = {this.state.userName}/>

                <TextInput
                    style = {styles.input}
                    placeholder = "Password"
                    onChangeText = {(password) => {this.setState({password})}}
                    value = {this.state.password}/>

                <TextInput
                    style = {styles.input}
                    placeholder = "Email"
                    onChangeText = {(email) => {this.setState({email})}}
                    value = {this.state.email}/>

                <TouchableOpacity
                    style = {styles.buttonStyle}
                    onPress = { () => this.postUserRegisterData() }>

                    <Text style = {styles.buttonText}>Register</Text>
                </TouchableOpacity>

            </View>
        )
    }
} 

export default RegisterScreen;