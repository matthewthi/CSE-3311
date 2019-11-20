import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import ModalDropdown from "react-native-modal-dropdown";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SlidingPanel from 'react-native-sliding-up-down-panels';

import styles from './Styles'
import { throwStatement } from '@babel/types';

class MapScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {

        userName: this.props.navigation.getParam('userName'),
        //userId: this.props.navigation.getParam('userId'),
        
        /******************************************************************************* */
        //The following data members are all for <Marker> components.

        //Marker of currently selected posistion on map.
        markerSelect: null,

        //Filters for events.
        eventFilterList: [true, true, true, true],

        //List of event categories.
        eventCategoryList: [
          "Study Group",
          "Official UTA",
          "Food",
          "Social"
        ],

        //Arrays of event markers.
        markerEventCat1: [],
        markerEventCat2: [],
        markerEventCat3: [],
        markerEventCat4: [],
        /******************************************************************************* */

        /******************************************************************************* */
        //The following data members are all for event creation.

        //Holds the name of an event to be created. User sets with <TextInput>.
        eventName: null,

        //Holds the user's description of event to be created. User sets with <TextInput>.
        eventDescription: null,

        //Category of event to be selected.
        category: 0,

        //Coordinates of an event to be created. Chosen by pressing on the <MapView>.
        latitude: 0,
        longitude: 0,
        /******************************************************************************* */

        //Boolean. null to hide event description, 1 to show event description.
        showDecription: null,

        eventDescriptionText: null,

        //Used to determine which event description is shown on screen.
        markerDescription: -1,
        markerCategory: -1,
    }

      this.handleCreateEvent = this.handleCreateEvent.bind(this);
      //this.handleMarkerPress = this.handleMarkerPress.bind(this);
      //this.getEvents = this.getEvents.bind(this);
      //this.getUserEvents = this.getUserEvents.bind(this);
      //this.postEvent = this.postEvent.bind(this);
    }

    //Function used to set event category display filters.
    handleFilterSelect(index) {
      let list = [...this.state.eventFilterList];
      list[index] = !list[index];

      this.setState({eventFilterList: list});
    }

    //Function used to set event category.
    handleCategorySelect(index, value) {
      index = parseInt(index) + 1;
      index = index.toString();
      this.setState({category: index});
      console.log(`${this.state.category}, ${index}`);
    }

    //Function called with an event icon is pressed.
    //Shows the decription of the event on the screen.
    handleEventSelect(i, category) {
      this.setState({markerDescription: i, markerCategory: category})
    }

    handleMapPress(event) {
      this.setState({markerSelect: event.nativeEvent.coordinate, markerDescription: -1});
    }

    /*
    handleMarkerPress(arg1, arg2) {
      console.log(arg1, arg2);

      this.setState({showDecription: 1});

      text = this.state.userName + "\n" + JSON.stringify(arg1) + "\n" + JSON.stringify(arg2);

      this.setState({eventDescriptionText: text});
      
    }
    */

    //Function called when 'Create Event' button is pressed.
    //Adds an event icon at selected location.
    handleCreateEvent() {
      if(this.state.category === '1') {
        this.setState({
          markerEventCat1: [
            ...this.state.markerEventCat1,
            {
              username: this.state.userName,
              name: this.state.eventName,
              description: this.state.eventDescription,
              category: this.state.category,
              coordinate: this.state.markerSelect,
            }
          ]
        })
        console.log("TEST 1");
      }

      else if(this.state.category === '2') {
        this.setState({
          markerEventCat2: [
            ...this.state.markerEventCat2,
            {
              username: this.state.userName,
              name: this.state.eventName,
              description: this.state.eventDescription,
              category: this.state.category,
              coordinate: this.state.markerSelect
            }
          ]
        })
        console.log("TEST 2");
      }

      else if(this.state.category === '3') {
        this.setState({
          markerEventCat3: [
            ...this.state.markerEventCat3,
            {
              username: this.state.userName,
              name: this.state.eventName,
              description: this.state.eventDescription,
              category: this.state.category,
              coordinate: this.state.markerSelect
            }
          ]
        })
        console.log("TEST 3")
      }
      
      else if(this.state.category === '4') {
        this.setState({
          markerEventCat4: [
            ...this.state.markerEventCat4,
            {
              username: this.state.userName,
              name: this.state.eventName,
              description: this.state.eventDescription,
              category: this.state.category,
              coordinate: this.state.markerSelect
            }
          ]
        })
        console.log("TEST 4")
      }

      this.setState({markerSelect: null});
      this.postEvent();
    }

    getEvents() {
      return fetch('https://event-maps-api.herokuapp.com/events/', {
        method: 'GET',
      }).then((response) => response.json()).then((responseJSON) => {
        let mylist = responseJSON.Events;

        for(let i = 0; i < mylist.length; i++) {
          if(mylist[i].category === "1") {
            this.setState({markerEventCat1: [
              ...this.state.markerEventCat1,
              {
                username: mylist[i].username,
                name: mylist[i].name,
                description: mylist[i].description,
                category: mylist[i].category,
                coordinate: {latitude: mylist[i].latitude, longitude: mylist[i].longitude}
              }
            ]});
          }

          else if(mylist[i].category === "2") {
            this.setState({markerEventCat2: [
              ...this.state.markerEventCat2,
              {
                username: mylist[i].username,
                name: mylist[i].name,
                description: mylist[i].description,
                category: mylist[i].category,
                coordinate: {latitude: mylist[i].latitude, longitude: mylist[i].longitude}
              }
            ]});
          }

          else if(mylist[i].category === "3") {
            this.setState({markerEventCat3: [
              ...this.state.markerEventCat3,
              {
                username: mylist[i].username,
                name: mylist[i].name,
                description: mylist[i].description,
                category: mylist[i].category,
                coordinate: {latitude: mylist[i].latitude, longitude: mylist[i].longitude}
              }
            ]});
          }

          else if(mylist[i].category === "4") {
            this.setState({markerEventCat4: [
              ...this.state.markerEventCat4,
              {
                username: mylist[i].username,
                name: mylist[i].name,
                description: mylist[i].description,
                category: mylist[i].category,
                coordinate: {latitude: mylist[i].latitude, longitude: mylist[i].longitude}
              }
            ]});
          }
        }

        console.log(mylist);
      }).catch((error) => {
        console.error(error);
      });
    }

    /*
    getUserEvents() {
      id = this.state.userId.toString();
    
      return fetch('https://event-maps-api.herokuapp.com/user/events/created/' + id, {
        method: 'GET'
      }).then((response) => response.json()).then((responseJSON) => {
        //let mylist = (responseJSON.Events);
        //console.log(mylist[0].name, mylist[1].name);
        let mylist = responseJSON.UserCreatedEvents;

        console.log(mylist);
        console.log(id);
        console.log("Test test 1");
    })}
    */

    postEvent() {
      fetch('https://event-maps-api.herokuapp.com/events/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.eventName,
          address: 'Test address',
          longitude: this.state.markerSelect.longitude,
          latitude: this.state.markerSelect.latitude,
          category: this.state.category,
          tag: 'Test tag',
          description: this.state.eventDescription,
          username: this.state.userName
          //userId: '5d92642e17ad5006348be674', 
        })
      }).then((response) => response.json()).then((responseJSON) => {
        console.log(responseJSON);
      }).catch((error) => {
        console.error(error);
      });
    }

    //Get user's current location when component mounts.
    componentDidMount() {
      this.getEvents();
      //this.getUserEvents();

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
  
    //Render function.
    render() {
      return (
        <View style = {styles.mapConatiner}>
          <View style = {styles.mapHeaderStyle}>
            { this.state.eventFilterList.map((eventFilterList, index) => {return (
              <CheckBox
                key = {index}
                value = {eventFilterList}
                onChange = { () => this.handleFilterSelect(index) }/>
            )}) }
          </View>

          <MapView
            showsUserLocation = {true}
            onPress = {(event) => this.handleMapPress(event)}
            //onPress = {(event) => this.setState({markerSelect: event.nativeEvent.coordinate})}
            style = {styles.map}
            initialRegion = {{
            latitude: this.state.latitude, 
            longitude: this.state.longitude, 
            latitudeDelta: 0.09, 
            longitudeDelta: 0.0921}}>
  
            {/*Location select marker*/}
            { this.state.markerSelect &&     
              <Marker 
                coordinate = {this.state.markerSelect}>
                <Image 
                  source = {require('./images/marker-black.png')}
                  style = {styles.eventIconStyle}/>
              </Marker> }

            {/*Category 1 - Study Group Icon*/}
            { this.state.eventFilterList[0] && this.state.markerEventCat1.map((markerEventCat1, i) => {
                if(i == this.state.markerDescription && markerEventCat1.category == this.state.markerCategory) {
                  return (
                    <Marker
                      key = {i}
                      coordinate = {markerEventCat1.coordinate}
                      /*description = {markerEventCat1.description}
                      category = {markerEventCat1.category}*/>

                      <View style = {styles.eventDescriptionCat1Style}>
                        <View style = {styles.eventDescriptionStyle}>
                          <Text 
                            style = {styles.eventDescriptionHeaderStyle}>
                            {markerEventCat1.name}
                          </Text>
                          
                          <Text 
                            style = {styles.eventDescriptionUserStyle}>
                            {`\tCreated by ${markerEventCat1.username}\n`}
                          </Text>
                          
                          <Text>
                            {markerEventCat1.description}
                          </Text>
                        </View>
                      </View>
                    </Marker>
                  )
                }
                
                else {
                  return (
                    <Marker 
                      key = {i}
                      coordinate = {markerEventCat1.coordinate}  
                      description = {markerEventCat1.description} 
                      onPress = { () => this.handleEventSelect(i, markerEventCat1.category) }>
                      
                      <Image 
                        source = {require('./images/educational.png')}
                        style = {styles.eventIconStyle}/> 
                    </Marker>)
                  }
                })
              }

            { /*handleMarkerPress(markerEventCat1.description, markerEventCat1.coordinate) */}
            { /*this.state.eventFilterList[0] && this.state.markerEventCat1.map((markerEventCat1, i) => {return (
              <Marker 
                key = {i}
                coordinate = {markerEventCat1.coordinate}  
                description = {markerEventCat1.description} 
                onPress = {() => {this.handleMarkerPress(markerEventCat1.description, markerEventCat1.coordinate)}}>
                  <Image 
                    source = {require('./images/educational.png')}
                    style = {styles.eventIconStyle}/> 
            </Marker>)}) */}

            {/*Category 2 - Offical Uta Icon*/}
            { this.state.eventFilterList[1] && this.state.markerEventCat2.map((markerEventCat2, i) => {
                if(i == this.state.markerDescription && markerEventCat2.category == this.state.markerCategory) {
                  return (
                    <Marker
                      key = {i}
                      coordinate = {markerEventCat2.coordinate}
                      description = {markerEventCat2.description}>
              
                      <View style = {styles.eventDescriptionCat2Style}>
                        <View style = {styles.eventDescriptionStyle}>
                        <Text 
                            style = {styles.eventDescriptionHeaderStyle}>
                            {markerEventCat2.name}
                          </Text>
                          
                          <Text 
                            style = {styles.eventDescriptionUserStyle}>
                            {`\tCreated by ${markerEventCat2.username}\n`}
                          </Text>
                          
                          <Text>
                            {markerEventCat2.description}
                          </Text>
                        </View>
                      </View>
                    </Marker>
                  )
                }
              
                else {
                  return (
                    <Marker 
                      key = {i}
                      coordinate = {markerEventCat2.coordinate}
                      description = {markerEventCat2.description}
                      //onPress = {() => {this.handleMarkerPress(markerEventCat2.description, markerEventCat2.coordinate)}}>
                      onPress = { () => this.handleEventSelect(i, markerEventCat2.category) }>
                      
                      <Image
                        source = {require('./images/uta.png')}
                        style = {styles.eventIconStyle}/>
                    </Marker>
                  )
                }
              })
            }

            {/*Category 3 - Food Icon*/}
            { this.state.eventFilterList[2] && this.state.markerEventCat3.map((markerEventCat3, i) => {
                if(i == this.state.markerDescription && markerEventCat3.category == this.state.markerCategory) {
                  return (
                    <Marker
                      key = {i}
                      coordinate = {markerEventCat3.coordinate}
                      description = {markerEventCat3.description}
                      category = {markerEventCat3.category}>

                      <View style = {styles.eventDescriptionCat3Style}>
                        <View style = {styles.eventDescriptionStyle}>
                        <Text 
                            style = {styles.eventDescriptionHeaderStyle}>
                            {markerEventCat3.name}
                          </Text>
                          
                          <Text 
                            style = {styles.eventDescriptionUserStyle}>
                            {`\tCreated by ${markerEventCat3.username}\n`}
                          </Text>
                          
                          <Text>
                            {markerEventCat3.description}
                          </Text>
                        </View>
                      </View>
                    </Marker>
                  )
                }
                
                else {
                  return (
                    <Marker 
                      key = {i}
                      coordinate = {markerEventCat3.coordinate}  
                      description = {markerEventCat3.description} 
                      onPress = { () => this.handleEventSelect(i, markerEventCat3.category) }>
                      
                      <Image 
                        source = {require('./images/food.png')}
                        style = {styles.eventIconStyle}/> 
                    </Marker>)
                  }
                })
            }

            {/*Category 4 - Social Icon*/}
            { this.state.eventFilterList[3] && this.state.markerEventCat4.map((markerEventCat4, i) => {
                if(i == this.state.markerDescription && markerEventCat4.category == this.state.markerCategory) {
                  return (
                    <Marker
                      key = {i}
                      coordinate = {markerEventCat4.coordinate}
                      description = {markerEventCat4.description}
                      category = {markerEventCat4.category}>

                      <View style = {styles.eventDescriptionCat4Style}>
                        <View style = {styles.eventDescriptionStyle}>
                        <Text 
                            style = {styles.eventDescriptionHeaderStyle}>
                            {markerEventCat4.name}
                          </Text>
                          
                          <Text 
                            style = {styles.eventDescriptionUserStyle}>
                            {`\tCreated by ${markerEventCat4.username}\n`}
                          </Text>
                          
                          <Text>
                            {markerEventCat4.description}
                          </Text>
                        </View>
                      </View>
                    </Marker>
                  )
                }
                
                else {
                  return (
                    <Marker 
                      key = {i}
                      coordinate = {markerEventCat4.coordinate}  
                      description = {markerEventCat4.description} 
                      onPress = { () => this.handleEventSelect(i, markerEventCat4.category) }>
                      
                      <Image 
                        source = {require('./images/social.png')}
                        style = {styles.eventIconStyle}/> 
                    </Marker>)
                  }
                })
            }
          </MapView>

          {this.state.showDecription && 
            <View style = {styles.eventDescriptionStyle}>
              <Text>{this.state.eventDescriptionText}</Text>
            </View>}

          <View style = { styles.testStyle}>
            <SlidingPanel
              headerLayoutHeight = {50}
              headerLayout = { () =>
                <View style = {styles.headerLayoutStyle}>
                  <Text style = {{color: "white"}}>Event Menu</Text>
                </View> }

              slidingPanelLayout = {() =>
                <View style = {styles.slidingPanelLayoutStyle}>
                  <View style = {styles.inputContainerStyle}>
                    <TextInput 
                      style = {styles.input}
                      placeholder = "Event Name"
                      onChangeText = { (eventName) => this.setState({eventName})}
                      value = {this.state.eventName}/>

                    <TextInput
                      style = {styles.input}
                      placeholder = 'Description'
                      onChangeText = {(eventDescription) => this.setState({eventDescription})}
                      value = {this.state.eventDescription}/>
                  </View>

                  <View style = {styles.eventCategoryDropdownStyle}>
                    <ModalDropdown
                      options = {this.state.eventCategoryList}
                      onSelect = {(index, value) => {this.handleCategorySelect(index, value)}}>
                    </ModalDropdown>
                  </View>   

                  <View style = {styles.buttonContainerStyle}>
                    <TouchableOpacity
                      style = {styles.buttonStyle}
                      onPress = {this.handleCreateEvent}>
                      <Text style = {styles.buttonText}>Create Event</Text>
                    </TouchableOpacity>
                  </View>
                </View> }/>
          </View>
        </View> ); }
}

/*
<View style = {styles.mapIconsContainerStyle}>
<TouchableOpacity
    onPress = {() => this.setState({category: '1'})}>
    <Image 
        style = {styles.mapIconsStyle}
        source = {require('./images/marker-red.png')}/>
</TouchableOpacity>
<TouchableOpacity
    onPress = {() => this.setState({category: '2'})}>
    <Image 
        style = {styles.mapIconsStyle}
        source = {require('./images/marker-purple.png')}/>
</TouchableOpacity>
<TouchableOpacity
    onPress = {() => this.setState({category: '3'})}>
    <Image 
        style = {styles.mapIconsStyle}
        source = {require('./images/marker-green.png')}/>
</TouchableOpacity>
<TouchableOpacity 
    onPress = {() => this.setState({category: '4'})}>
    <Image 
        style = {styles.mapIconsStyle}
        source = {require('./images/marker-orange.png')}/>
</TouchableOpacity>
</View>
*/

export default MapScreen;