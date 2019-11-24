class Functions {

    static async postLoginData(username, password) {
      try {
        let response = await fetch('https://event-maps-api.herokuapp.com/user/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        });
  
        let responseJSON = await response.json();

        if(responseJSON.successful == true) {
          console.log("response true");
          return true;
        }

        return false;
      }

      catch (error) {
        console.error(error);
      }
    }  
}

export default Functions;