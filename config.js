import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBfZC-cSvxXlbJ3Kygqo2F2ptD9a_-3ZUM',
  authDomain: 'wireless-buzzer-b0433.firebaseapp.com',
  databaseURL: 'https://wireless-buzzer-b0433-default-rtdb.firebaseio.com',
  projectId: 'wireless-buzzer-b0433',
  storageBucket: 'wireless-buzzer-b0433.appspot.com',
  messagingSenderId: '805282529315',
  appId: '1:805282529315:web:41c32946b6e839da30f196',
  measurementId: 'G-77EEVSRHSD',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.database()
