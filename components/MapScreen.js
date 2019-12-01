import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import SlidingPanel from 'react-native-sliding-up-down-panels';

import EventDescriptionMarker from "./EventDescriptionMarker";
import MapScreenNavBar from "./MapScreenNavBar";
import EventFilters from "./EventFilters";
import CreateEvent from "./CreateEvent";
import UserProfile from "./UserProfile";
import Functions from "./Functions";
import styles from './Styles';

class MapScreen extends Component {
    constructor(props) {
      super(props);

      this.state = {
        //User information.
        userName: this.props.navigation.getParam('userName'),
        userId: this.props.navigation.getParam('userId'),
        userEmail: null,

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

        //Used to determine which event description is shown on screen.
        markerDescription: -1,
        markerCategory: -1,

        //Used for nav bar at bottom of MapScrren. Value of -1 to hide components.
        showFilters: -1,
        showCreate: -1,
        showUser: -1
    }

      this.handleCreateEvent = this.handleCreateEvent.bind(this);
      //this.handleMarkerPress = this.handleMarkerPress.bind(this);
      //this.getEvents = this.getEvents.bind(this);
      //this.getUserEvents = this.getUserEvents.bind(this);
      //this.postEvent = this.postEvent.bind(this);
    }

    handleNavBarFilterSelect = () => {
      this.setState({showFilters: 1});
    }

    handleCreateSelect = () => {
      if(this.state.showCreate == -1) {
        this.setState({showCreate: 1});
      }
      
      else if(this.state.showCreate == 1) {
        this.setState({showCreate: 2});
      }
    }

    handleUserSelect = () => {
      this.setState({showUser: 1});
    }

    //Function used to set event category display filters. Parent function that will be passed to child component.
    handleFilterSelectParent = (list) => {
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
      this.setState({
        markerSelect: event.nativeEvent.coordinate, 
        markerDescription: -1,
        showFilters: -1,
        showCreate: -1,
        showUser: -1});
    }

    getEventDetails = (event) => {
      console.log(event);

      this.setState({showCreate: -1});
    }

    //Function called when 'Create Event' button is pressed.
    //Adds an event icon at selected location.
    handleCreateEvent() {
      //Create event object.
      let event = {
        username: this.state.userName,
        name: this.state.eventName,
        description: this.state.eventDescription,
        category: this.state.category,
        coordinate: this.state.markerSelect
      }

      //Place event object into appropriate event list.
      if(this.state.category === "1") {
        this.setState({markerEventCat1: [...this.state.markerEventCat1, event]});
      }

      else if(this.state.category === "2") {
        this.setState({markerEventCat2: [...this.state.markerEventCat2, event]});
      }

      else if(this.state.category === "3") {
        this.setState({markerEventCat3: [...this.state.markerEventCat3, event]});
      }

      else if(this.state.category === "4") {
        this.setState({markerEventCat4: [...this.state.markerEventCat4, event]})
      }

      //Remove location select marker from MapView after new event marker has been rendered.
      this.setState({markerSelect: null});

      //Add new event data to database.
      Functions.postEvent(event);
    }

    //Initialize event lists when component first mounts.
    initEventList(eventList) {
      for(let i = 0; i < eventList.length; i++) {
        //Create JS object of event.
        let event = {
          username: eventList[i].username,
          name: eventList[i].name,
          description: eventList[i].description,
          category: eventList[i].category,
          coordinate: {latitude: eventList[i].latitude, longitude: eventList[i].longitude},
          likes: eventList[i].likes
        }

        //Place event object into appropriate list based on category.
        if(eventList[i].category === "1") {
          this.setState({markerEventCat1: [...this.state.markerEventCat1, event]});
        }

        else if(eventList[i].category === "2") {
          this.setState({markerEventCat2: [...this.state.markerEventCat2, event]});
        }

        else if(eventList[i].category === "3") {
          this.setState({markerEventCat3: [...this.state.markerEventCat3, event]});
        }

        else if(eventList[i].category === "4") {
          this.setState({markerEventCat4: [...this.state.markerEventCat4, event]});
        }
      }
    }

    //**********Component Did Mount Function**********
    async componentDidMount() {
      //this.getUserEvents();

      //Get user's current location.
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

      //Get list of events from database.
      try {
        let result = await Functions.getEvents();

        //Populate state with events.
        this.initEventList(result);
      }

      catch (error) {
        console.error(error);
      }

      try{
        let result = await Functions.getUserData(this.state.userId);

        this.setState({userEmail: result.user.email});
      }

      catch (error) {
        console.error(error);
      }
    }
  
    //**********Render Function**********
    render() {
      return (
        <View style = {styles.mapConatiner}>
          <MapView
            showsUserLocation = {true}
            onPress = {(event) => this.handleMapPress(event)}
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
                    <EventDescriptionMarker
                      key = {i}
                      name = {markerEventCat1.name}
                      username = {markerEventCat1.username}
                      description = {markerEventCat1.description}
                      coordinate = {markerEventCat1.coordinate}
                      eventDescriptionCatStyle = {styles.eventDescriptionCat1Style}
                      likes = {markerEventCat1.likes}/>
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
                    </Marker>)}})}

            {/*Category 2 - Offical Uta Icon*/}
            { this.state.eventFilterList[1] && this.state.markerEventCat2.map((markerEventCat2, i) => {
                if(i == this.state.markerDescription && markerEventCat2.category == this.state.markerCategory) {
                  return (
                    <EventDescriptionMarker
                      key = {i}
                      name = {markerEventCat2.name}
                      username = {markerEventCat2.username}
                      description = {markerEventCat2.description}
                      coordinate = {markerEventCat2.coordinate}
                      eventDescriptionCatStyle = {styles.eventDescriptionCat2Style}
                      likes = {markerEventCat2.likes}/>
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
                    </Marker>)}})}

            {/*Category 3 - Food Icon*/}
            { this.state.eventFilterList[2] && this.state.markerEventCat3.map((markerEventCat3, i) => {
                if(i == this.state.markerDescription && markerEventCat3.category == this.state.markerCategory) {
                  return (
                    <EventDescriptionMarker
                      key = {i}
                      name = {markerEventCat3.name}
                      username = {markerEventCat3.username}
                      description = {markerEventCat3.description}
                      coordinate = {markerEventCat3.coordinate}
                      eventDescriptionCatStyle = {styles.eventDescriptionCat3Style}
                      likes = {markerEventCat3.likes}/>
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
                    </Marker>)}})}

            {/*Category 4 - Social Icon*/}
            { this.state.eventFilterList[3] && this.state.markerEventCat4.map((markerEventCat4, i) => {
                if(i == this.state.markerDescription && markerEventCat4.category == this.state.markerCategory) {
                  return (
                    <EventDescriptionMarker
                      key = {i}
                      name = {markerEventCat4.name}
                      username = {markerEventCat4.username}
                      description = {markerEventCat4.description}
                      coordinate = {markerEventCat4.coordinate}
                      eventDescriptionCatStyle = {styles.eventDescriptionCat4Style}
                      likes = {markerEventCat4.likes}/>
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
                    </Marker>)}})}
          </MapView>

          {/*MapScreen NavigationBar components start here*/}

          {/*Event Category Filters*/}
          {this.state.showFilters == 1 && 
            <EventFilters
              handleFilterSelect = {this.handleFilterSelectParent}/>}

          {/*Event Creation Component*/}
          {this.state.showCreate == 1 &&
            <CreateEvent
              getEventDetails = {this.getEventDetails}/>}      

          {/*User profile component*/}
          {this.state.showUser == 1 &&
            <UserProfile
              userName = {this.state.userName}
              userEmail = {this.state.userEmail}/>}
          
          {/*MapScreen navigation bar*/}
          {this.state.showFilters == -1 && this.state.showCreate == -1 && this.state.showUser == -1 &&
            <MapScreenNavBar
              handleNavBarFilterSelect = {this.handleNavBarFilterSelect}
              handleCreateSelect = {this.handleCreateSelect}
              handleUserSelect = {this.handleUserSelect}/>
          }

{/*End new stuff */}

          {false &&
          <View style = {styles.testStyle}>
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
          }
        </View> ); }
}

export default MapScreen;