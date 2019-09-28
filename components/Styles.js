import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e90ff",
        alignItems: "center", 
        justifyContent: "center",
    },

    mapConatiner: {
        flex: 1,
    },
  
    map: {
        flex: 10,
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

    mapIconsStyle: {
        width: 25,
        height: 40,
    },

    input: {
      width: "75%",
      backgroundColor: "#fff",
      padding: 15,
      marginTop: 10,
    },
  
    inputContainerStyle: {
      alignItems: 'center'
    },

    buttonStyle: {
      width: "45%",
      padding: 15,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: "#ffd700"
    },

    buttonContainerStyle: {
      alignItems: 'center'
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
  
    headerLayoutStyle: {
      width,
      height: 50,
      backgroundColor: "#ffd700",
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    slidingPanelLayoutStyle: {
      width,
      height,
      backgroundColor: "#1e90ff",
      justifyContent: 'flex-start',
    },

    testStyle: {
      flex: 1
    }
  });