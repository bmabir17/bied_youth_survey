import firebase from 'firebase';

const config={
  apiKey: "AIzaSyCRLPV54LXeJ3drZl4HMin6Bcl5kPIXxQM",
  authDomain: "bied-survey.firebaseapp.com",
  databaseURL: "https://bied-survey.firebaseio.com",
  projectId: "bied-survey",
  storageBucket: "bied-survey.appspot.com",
  messagingSenderId: "418768995032"
};
firebase.initializeApp(config);
export default firebase;
