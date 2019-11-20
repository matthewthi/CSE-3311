

class Functions {

    static postLoginData(userName, passWord) {
        let result = null;

        fetch('https://event-maps-api.herokuapp.com/user/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userName,
            password: passWord,
          })
        }).then((response) => response.json()).then((responseJSON) => {
            //let result = responseJSON;

            if(responseJSON.successful == true) {
                console.log("test");
                
                result = responseJSON.user_id;
                //this.props.navigation.navigate('Map', {userId: result.user_id});
            }
        }).catch((error) => {
          console.error(error);
        });

        console.log(result)
        return result;
    }
}

export default Functions;