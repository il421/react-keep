import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };


// MY REFERENCES
// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => { // can see removed events data
//   console.log(snapshot.key, snapshot.val());
// });

// // child_chenged
// database.ref('expenses').on('child_chenged', (snapshot) => { // can see chenged events data
//   console.log(snapshot.key, snapshot.val());
// });

// // child_added
// database.ref('expenses').on('child_added', (snapshot) => { // can see added events data
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
// });

// database.ref('expenses').push({
//   description: 'Rent',
//   note: '',
//   amount: 500,
//   createdAt: 51548545
// });

// database.ref('notes').push({ // push data
//   title: 'Ivam',
//   body: 'My son'
// })

// database.ref('notes/id').update({ // update data
//   title: 'Ivan',
// })

// database.ref('notes/id').remove() // remove

// const notes = [
//   {
//     id: '1',
//     title: 'Ivam',
//     body: 'My son'
//   },
//   {
//     id: '2',
//     title: 'Ilya',
//     body: 'Me'
//   },
//   {
//     id: '3',
//     title: 'Tany',
//     body: 'My wife'
//   }
// ];

// database.ref().on('value', (snapshot) => { // watch for firebase changes to fetching data
//   console.log(snapshot.val())
// });

// database.ref().off(); // stop watching

// database.ref().once('value').then((snapshot) =>{ // fetch data from firebase
//   const val = snapshot.val()
//   console.log(val);
// }).catch((e) => {
//   console.log('Error: '+ e);
// })

// database.ref().set({ // set data
//   name: 'Ilya Suglobov',
//   age: 33,
//   stressLevel: 6,
//   job: {
//     titile: 'Developer',
//     company: 'MarineDeals'
//   },
//   isSingle: false,
//   location: {
//     city: 'Auckland',
//     country: 'NewZealand'
//   }
// }).then(() => {
//   console.log("data is saved")
// }).catch((e) => {
//   console.log(encodeURI)
// });

// database.ref().update({ // update (set and deletw if null)
//   name: 'Ivan Suglobov',
//   age: 7,
//   job: 'student',
//   isSingle: null,
//   'location\city': 'Taganrog' // inofficial syntax 
// })

// database.ref('age').remove().then(() => { // remove only
//   console.log('REmoved !!!')
// })