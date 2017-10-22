// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '527681834237720', // your App ID
        'clientSecret'    : '917dd08df1fd84777ea6c5af94844f50', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '412467755457-ma18eqdheti42ns6818q57k6nrk1bajb.apps.googleusercontent.com',
        'clientSecret'     : '9gtH-OdrX3PmDTZjLo1dEadI',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};

