// firebaseConfig.js

import { firebase } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCzThDcbF5ekPchAMrN1dqDlhvkhg2CRxY",
  authDomain: "rnlmsapp-40e14.firebaseapp.com",
  projectId: "rnlmsapp-40e14",
  storageBucket: "rnlmsapp-40e14.appspot.com",
  messagingSenderId: "832229097569",
  appId: "1:832229097569:android:0729d23988155bee6d6a20",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
