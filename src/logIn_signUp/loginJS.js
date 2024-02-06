const h3 = document.querySelector(".info .right .h3");
const dayOfTheWeek = document.querySelector(".timeDetails .dayOfTheWeek");
const dayOfThemonth = document.querySelector(".timeDetails .dayOfThemonth");
const month = document.querySelector(".timeDetails .month");
const timeTable = document.querySelector(".timeDetails .timeTable");
const backGroundPost = document.querySelector(".backGroundPost");

const moveData = JSON.parse(localStorage.getItem("dataChosenMovie"));
const reservationDate = JSON.parse(localStorage.getItem("reservationDate"));
const sectionTime = JSON.parse(localStorage.getItem("sectionTime"));

const moveDataArray = moveData;

function deployingMoveImfo() {
  h3.innerHTML = `${moveDataArray[0].title}`;
  backGroundPost.style.backgroundImage = `url(${moveData[0].imgPoster})`;
  dayOfTheWeek.innerHTML = `${reservationDate.weekDayValue}`;
  dayOfThemonth.innerHTML = `${reservationDate.dayMonthValue}`;
  month.innerHTML = `${reservationDate.monthValue}`;
  timeTable.innerHTML = `${sectionTime}`;
}
deployingMoveImfo();

//----------------- Login authentification---------------------------------------
const errorWarning = document.querySelector(".errorWarning");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
const db = getFirestore();
const auth = getAuth(app);

const enter = document.querySelector(".enterBtn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    function SingInUser() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      signInWithEmailAndPassword(auth, email, password).then(async (userCredintial) => {
        var docRef = doc(db, "UserAuthList", userCredintial.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          localStorage.setItem("user-info", JSON.stringify({ firstNAme: docSnap.data().FirstName }));
        } else {
          console.log("No such document!");
        }
      });
      setTimeout(() => {
        errorWarning.style.display = "block";
      }, 500);
    }
    enter.addEventListener("click", SingInUser);
  } else {
    let lastPage = JSON.parse(localStorage.getItem("lastPage"));
    location.href = `${lastPage}`;
    console.log("Error");
  }
});
