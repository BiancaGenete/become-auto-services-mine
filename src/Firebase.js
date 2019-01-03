import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDhylDUdbcfy11BYYt9URUBlEM1d3GnKDo",
  authDomain: "ecommerceproject-cebc9.firebaseapp.com",
  databaseURL: "https://ecommerceproject-cebc9.firebaseio.com/",
  projectId: "ecommerceproject-cebc9",
  storageBucket: "ecommerceproject-cebc9.appspot.com",
  messagingSenderId: "186748877998"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
