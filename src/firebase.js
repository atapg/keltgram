import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCuZHzsljDDWjEGRpoHYtoVUnRoqrsqbxU",
    authDomain: "keltgram.firebaseapp.com",
    projectId: "keltgram",
    storageBucket: "keltgram.appspot.com",
    messagingSenderId: "338265530541",
    appId: "1:338265530541:web:e6553746718ff823306624",
    measurementId: "G-63NNV32FPF"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}