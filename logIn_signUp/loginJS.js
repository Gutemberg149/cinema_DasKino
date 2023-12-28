const h3 = document.querySelector(".info .right .h3");
const dayOfTheWeek = document.querySelector(".timeDetails .dayOfTheWeek");
const dayOfThemonth = document.querySelector(".timeDetails .dayOfThemonth");
const month = document.querySelector(".timeDetails .month");
const timeTable = document.querySelector(".timeDetails .timeTable");
const backGroundPost = document.querySelector(".backGroundPost");

const moveData = JSON.parse(localStorage.getItem("dataChosenMovie"));
const reservationDate = JSON.parse(localStorage.getItem("reservationDate"));
const sectionTime = JSON.parse(localStorage.getItem("sectionTime"));

function deployingMoveImfo() {
  h3.innerHTML = `${moveData[0].title}`;
  backGroundPost.style.backgroundImage = `url(${moveData[0].imgPoster})`;
  dayOfTheWeek.innerHTML = `${reservationDate.weekDayValue}`;
  dayOfThemonth.innerHTML = `${reservationDate.dayMonthValue}`;
  month.innerHTML = `${reservationDate.monthValue}`;
  timeTable.innerHTML = `${sectionTime}`;
}
deployingMoveImfo();

//----------------- Login authentification---------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0iaI3AI8Zl8c3qJF0w__aeU4ioxilgBY",
  authDomain: "daskino-af8b4.firebaseapp.com",
  projectId: "daskino-af8b4",
  storageBucket: "daskino-af8b4.appspot.com",
  messagingSenderId: "126714622435",
  appId: "1:126714622435:web:d9586830e3bdf1b5d230d6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const enter = document.querySelector(".enterBtn");

function SingInUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password).then(async (userCredintial) => {
    var docRef = doc(db, "UserAuthList", userCredintial.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      localStorage.setItem("user-info", JSON.stringify({ firstNAme: docSnap.data().FirstName }));
      // window.location.href = "../index/index.html";
    } else {
      console.log("No such document!");
    }
  });
}
enter.addEventListener("click", SingInUser);

// const db = getFirestore();

// const enter = document.querySelector(".enterBtn");

// let signInUser = () => {
//   const email = document.getElementById("email");
//   const password = document.getElementById("password");

//   signInWithEmailAndPassword(auth, email.value, password.value)
//     .then(async (credentials) => {
//       console.log(credentials);
//       var ref = doc(db, "UserAuthList", credentials.user.uid);

//       const docSnap = await getDoc(ref);
//       alert("You have signed in succesfully");
//       if (docSnap.exists()) {
//         sessionStorage.setItem("user-info", JSON.stringify({ fullName: docSnap.data().fullName }));
//         sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
//         window.location.href = "index.html";
//       }
//     })
//     .catch((error) => {
//       console.log(error.code);
//       console.log(error.message);
//     });
// };
// enter.addEventListener("click", signInUser);
