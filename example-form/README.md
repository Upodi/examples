# Example form
This is an example form where you can create a user and assign a card to the user.

You have to add your upodi.js key from your platform
in 'cardtokenhandling.js' here
```javascript
upodi.setKey('UPODI JS KEY HERE');'
```

and you have to insert your READ/WRITE key in 'handleUserData.js' at 2 places here
```javascript
    xhr.setRequestHeader('Authorization', "bearer " + btoa('A NORMAL READ/WRITE API KEY HERE'));
```