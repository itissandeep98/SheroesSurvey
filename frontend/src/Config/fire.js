import firebase from 'firebase/app';
require('firebase/storage');

var firebaseConfig = {
	apiKey: 'AIzaSyALmretc1doOTG7P3IH9auiBxD_-_iTGXw',
	authDomain: 'sheroes-41195.firebaseapp.com',
	projectId: 'sheroes-41195',
	storageBucket: 'sheroes-41195.appspot.com',
	messagingSenderId: '207870071755',
	appId: '1:207870071755:web:6a1e85c2e0b8ca54975c4e',
};

const fire = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default fire;
