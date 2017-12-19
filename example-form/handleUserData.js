/**
 * Posts the user to the server, which creates the user with the personal information.
 * Assigns the card token to the user that was created with the personal information
 */
function handleUserData() {
    var token = document.getElementById('token').value;
    var data = JSON.stringify(getUserData());
    
    /**
     * Call to create a new user with POST call. Through api
     */
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        //UserID returned after the user is created.
        var userID = JSON.parse(this.responseText);
        //Creating the token data to be posted in the body of the PUT call to assign card.
        var data = JSON.stringify({
            'token' : token,
            'makedefault' : true
        });
        
        /**
         * Call to assign credit card token to newly created user with variable userid
         */
        var xhr = new XMLHttpRequest();
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            console.log("Success")
          }
        });
        
        xhr.open("PUT", "https://api.upodi.io/v2/customers/" + userID.ID + "/assigncardtoken/");
    
        xhr.setRequestHeader('Authorization', "bearer " + btoa('A NORMAL READ/WRITE API KEY HERE'));
        xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
        xhr.send(data);
      }
    });
    
    xhr.open("POST", "https://api.upodi.io/v2/customers");

    xhr.setRequestHeader('Authorization', "bearer " + btoa("A NORMAL READ/WRITE API KEY HERE"));
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.send(data);
}

/**
 * Gets the forms input data.
 */
function getUserData() {
    return customer = {
        'fullname' : document.getElementById('firstname').value + " " + document.getElementById('lastname').value,
        'addressline1' : document.getElementById('address').value,
        'postalcode' : document.getElementById('zip').value,
        'country' : document.getElementById('country').value
    }
}