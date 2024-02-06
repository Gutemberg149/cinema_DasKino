const homeBtn = document.querySelector(".homeBtn");
const img = document.querySelector(".left .imgTicket");
const title = document.querySelector(".titleContainer .title");
const date = document.querySelector(".dateContainer .date");
const time = document.querySelector(".timeContainer .time");
const seats = document.querySelector(".seats");
const signOutBtn = document.querySelector(".signOutBtn");
const signInBtn = document.querySelector(".signInBtn");
const userNameNavBar = document.querySelector(".userNameNavBar");

let dataChosenMovie = JSON.parse(localStorage.getItem("dataChosenMovie"));
let reservationDate = JSON.parse(localStorage.getItem("reservationDate"));
let sectionTime = JSON.parse(localStorage.getItem("sectionTime"));
let arraySeatLocalStorage = JSON.parse(localStorage.getItem("arraySeatLocalStorage"));

window.addEventListener("load", () => {
  title.innerHTML = dataChosenMovie[0].title;
  date.innerHTML = reservationDate.dayMonthValue + "/" + reservationDate.monthValue + "/" + 2024;
  time.innerHTML = sectionTime;
  seats.innerHTML = arraySeatLocalStorage;
  img.src = dataChosenMovie[0].imgPoster;
});

homeBtn.addEventListener("click", () => {
  localStorage.setItem("arraySeatLocalStorage", JSON.stringify(""));
  localStorage.setItem("numberOfFullPriceSeats", JSON.stringify(""));
  localStorage.setItem("numberOfHalfPriceSeats", JSON.stringify(""));
  localStorage.setItem("arraySeatLocalStorage", JSON.stringify(""));
  localStorage.setItem("idItem", JSON.stringify(""));
  localStorage.setItem("sectionTime", JSON.stringify(""));
  localStorage.setItem("dataChosenMovie", JSON.stringify(""));
  localStorage.setItem("reservationDate", JSON.stringify(""));
});

//--------------------------Authentication----------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
const auth = getAuth();

function checkUserAndRetrieveInfo() {
  signOutBtn.style.display = "none";
  signInBtn.style.display = "none";

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      signOutBtn.style.display = "none";
      signInBtn.style.display = "none";
      try {
        const userUID = user.uid;
        const docRef = doc(db, "UserAuthList", userUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          signOutBtn.style.display = "flex";
          signInBtn.style.display = "none";
          userNameNavBar.innerHTML = docSnap.data().FirstName;
          signOutBtn.addEventListener("click", () => {
            signOutUser();
          });
        } else {
          console.log("User document not found in Firestore");
        }
      } catch (error) {
        console.error("Error getting user document:", error);
      }
    } else {
      signOutBtn.style.display = "none";
      signInBtn.style.display = "flex";
    }
  });
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      userNameNavBar.innerHTML = "";
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

checkUserAndRetrieveInfo();

// capture the page path the user was on when press sign in btn, for later on come back to it automatically.
signInBtn.addEventListener("click", () => {
  localStorage.setItem("lastPage", JSON.stringify("../ticketPage/ticketPAge.html"));
});
