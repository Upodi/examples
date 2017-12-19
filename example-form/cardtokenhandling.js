$( document ).ready(function() {
    console.log( "ready!" );
    upodi.setKey('UPODI JS KEY HERE');
  
    $('form').on('submit', function (event) {
      var form = this;
      event.preventDefault();
  
      upodi.token(form, function (err, token) {
        if (err) {
          alert(err);
          // handle error 
        } else {
            //Calls a method that handles the data from the form and creates a user and assigns a credit card to it.
            handleUserData();
            //Reset the form.
            document.getElementById('form').reset();
          // token field is now filled. Process the form.
        }
      });
    });
  });