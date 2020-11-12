import firebase from 'firebase';
import "@firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDscJj-9-k3cI-fjY8fFII0lsGtzu2cxQk",
    authDomain: "todolist-b1f05.firebaseapp.com",
    databaseURL: "https://todolist-b1f05.firebaseio.com",
    projectId: "todolist-b1f05",
    storageBucket: "todolist-b1f05.appspot.com",
    messagingSenderId: "986372699553",
    appId: "1:986372699553:web:b8a017a5c11802106147e0",
    measurementId: "G-9L9Y43EGJT"
};
firebase.initializeApp(firebaseConfig);

export default class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                })
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("listTodoList");
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            callback(lists);
        },
            function (error) {
                console.error(error);
            });

    }

    addList(list) {

    }

    detach() {
        this.unsubscribe();
    }
}