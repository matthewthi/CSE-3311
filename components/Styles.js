import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({

    //LoginScreen Styles
    container: {
      flex: 1,
      //backgroundColor: "#1e90ff",
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center"
    },

    buttonStyle: {
      width: "40%",
      padding: 15,
      borderRadius: 15,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: "orange"
      //backgroundColor: "#ffd700"
    },

    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "90%"
    },

    loginFailedTextStyle: {
      color: "red"
    },  
    //
    mapConatiner: {
        flex: 1,
    },
  
    map: {
        flex: 10,
    },
  
    //Styles for when clicking on an event marker.
    eventDescriptionHeaderStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    },

    eventDescriptionUserStyle: {
      fontStyle: "italic",
      textAlign: "right"
    },

    eventDescriptionStyle: {
      backgroundColor: "white",
      borderRadius: 10,
      margin: 10,
      padding: 10
    },

    eventDescriptionCat1Style: {
      backgroundColor: "blue",
      borderRadius: 10,
      margin: 1,
      padding: 1
    },
    
    eventDescriptionCat2Style: {
      backgroundColor: "orange",
      borderRadius: 10,
      margin: 1,
      padding: 1
    },

    eventDescriptionCat3Style: {
      backgroundColor: "red",
      borderRadius: 10,
      margin: 1,
      padding: 1
    },

    eventDescriptionCat4Style: {
      backgroundColor: "pink",
      borderRadius: 10,
      margin: 1,
      padding: 1
    },

    createEventContainerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    mapIconsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },

    eventIconStyle: {
      width: 40,
      height: 55
    },

    mapIconsStyle: {
        width: 25,
        height: 40,
    },

    input: {
      width: "75%",
      backgroundColor: "#ddd",
      borderRadius: 15,
      borderColor: "black",
      padding: 15,
      marginTop: 10,
    },
  
    inputContainerStyle: {
      flex: 0,
      alignItems: 'center'
    },

    buttonContainerStyle: {
      alignItems: 'center'
    },
  
    userButton: {
      backgroundColor: "#ffd700",
      width: "45%",
      padding: 15
    },
  
    buttonText: {
      textAlign: "center",
    },
  
    headerLayoutStyle: {
      width,
      height: 50,
      //backgroundColor: "#ffd700",
      backgroundColor: "blue",
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    slidingPanelLayoutStyle: {
      width,
      height,
      //backgroundColor: "#1e90ff",
      backgroundColor: "white",
      alignContent: "center",
      justifyContent: 'flex-start',
    },

    testStyle: {
      flex: 1
    },

    mapHeaderStyle: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "white"
    },

    eventCategoryDropdownStyle: {
      width: "75%",
      padding: 15,
      marginTop: 10,
      alignSelf: "center",
      backgroundColor: "white"
    }
  });