// Your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyCQhgEFv3gYyFh2OuHoFcgCKsJYIj-VNtI",
  authDomain: "stagingloginservice.firebaseapp.com",
  databaseURL: "https://stagingloginservice-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "stagingloginservice",
  storageBucket: "stagingloginservice.firebasestorage.app",
  messagingSenderId: "747704223983",
  appId: "1:747704223983:web:242b4566597720fa43331a",
  measurementId: "G-971796KY1R"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const message = document.getElementById('message');
const rankDisplay = document.getElementById('rankDisplay');

loginBtn.onclick = () => {
  auth.signInWithEmailAndPassword(email.value, password.value)
    .then(user => {
      message.textContent = "Logged in!";
      loadRank(user.user.uid);
    })
    .catch(err => message.textContent = err.message);
};

signupBtn.onclick = () => {
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(user => {
      const uid = user.user.uid;
      db.ref("users/" + uid).set({
        email: email.value,
        rank: "user"
      });
      message.textContent = "Account created!";
      loadRank(uid);
    })
    .catch(err => message.textContent = err.message);
};

function loadRank(uid) {
  db.ref("users/" + uid + "/rank").once("value")
    .then(snapshot => {
      const rank = snapshot.val();
      rankDisplay.textContent = "Your Rank: " + rank;
    });
}
