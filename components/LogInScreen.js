import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity} from 'react-native';

class LogInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null
        }
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
                    placeholder = "Password"/>

                <View style = {styles.buttonContainer}>
                    <TouchableOpacity 
                        style = {styles.userButton}
                        onPress = {() => this.props.navigation.navigate('Map', {userName: this.state.userName})}>
        
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1e90ff",
      alignItems: "center", 
      justifyContent: "center",
    },
  
    input: {
      width: "90%",
      backgroundColor: "#fff",
      padding: 15,
      marginBottom: 10
    },
  
    buttonContainer: {
      flexDirection: "row",
  
    },
  
    userButton: {
      backgroundColor: "#ffd700",
      width: "45%",
      padding: 15
    },
  
    buttonText: {
      textAlign: "center",
    },
  
  });

export default LogInScreen;