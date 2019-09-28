import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SlidingPanel from 'react-native-sliding-up-down-panels';

import styles from './Styles'

class MapScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userName: this.props.navigation.getParam('userName'),
        latitude: 0,
        longitude: 0,
        category: null,

        //Marker of currently selected posistion on map.
        markerSelect: null,
        //Markers of created events.
        markerEvent: [],

        error: null
    }
      this.handleCreateEvent = this.handleCreateEvent.bind(this);
      //marker: null;
    }

    handleCreateEvent() {
      if(this.state.category === '1'){
        this.setState({
          markerEvent: [
            ...this.state.markerEvent,
            {
              coordinate: this.state.markerSelect
            }
          ]
        })
        console.log("TEST 1");
      }
    }

    componentDidMount() {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
        },
        error => this.setState({error: error.message})
      );
      console.log(JSON.stringify(this.state.userName))
    }
  
    render() {
      return (
        <View style = {styles.mapConatiner}>
            <MapView
                showsUserLocation = {true}
                onPress = {(event) => this.setState({markerSelect: event.nativeEvent.coordinate})}
                style = {styles.map}
                initialRegion = {{
                latitude: this.state.latitude, 
                longitude: this.state.longitude, 
                latitudeDelta: 0.09, 
                longitudeDelta: 0.0921}}>
    
                {this.state.markerSelect &&     
                <Marker 
                  coordinate = {this.state.markerSelect}>
                  <Image 
                    source = {require('./images/icon_1.png')}
                    style = {{width: 25, height: 40}}/>
                </Marker>}

                {this.state.markerEvent.map((markerEvent) => {return <Marker {...markerEvent}/>})}
            </MapView>

            
            <View style = {styles.testStyle}>
            <SlidingPanel
                headerLayoutHeight = {50}
                headerLayout = {() =>
                    <View style = {styles.headerLayoutStyle}>
                        <Text>Create Event</Text>
                    </View>
                }
                slidingPanelLayout = {() =>
                    <View style = {styles.slidingPanelLayoutStyle}>
                        <View style = {styles.inputContainerStyle}>
                            <TextInput 
                                style = {styles.input}
                                placeholder = "Location"/>

                            <TextInput
                                style = {styles.input}
                                placeholder = 'Description'/>
                        </View>
                        <View style = {styles.mapIconsContainerStyle}>
                            <TouchableOpacity
                                onPress = {() => this.setState({category: '1'})}>
                                <Image 
                                    style = {styles.mapIconsStyle}
                                    source = {require('./images/icon_1.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = {() => this.setState({category: '2'})}>
                                <Image 
                                    style = {styles.mapIconsStyle}
                                    source = {require('./images/icon_2.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = {() => this.setState({category: '3'})}>
                                <Image 
                                    style = {styles.mapIconsStyle}
                                    source = {require('./images/icon_3.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress = {() => this.setState({category: '4'})}>
                                <Image 
                                    style = {styles.mapIconsStyle}
                                    source = {require('./images/icon_4.png')}/>
                            </TouchableOpacity>
                        </View>   

                        <View style = {styles.buttonContainerStyle}>
                            <TouchableOpacity
                                style = {styles.buttonStyle}
                                onPress = {this.handleCreateEvent}>
                                <Text style = {styles.buttonText}>Create Event</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }/>
            </View>
        </View>
        );
    }
}

export default MapScreen;