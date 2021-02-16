import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyAzv2beTZtIIAgapzjuo7CbOocXuO3u3pw",
    authDomain: "barterapp-7c398.firebaseapp.com",
    projectId: "barterapp-7c398",
    storageBucket: "barterapp-7c398.appspot.com",
    messagingSenderId: "301431382950",
    appId: "1:301431382950:web:3cecb426c4b5d3027ba567"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();