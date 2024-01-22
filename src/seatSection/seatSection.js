const header = document.getElementsByTagName("header");
const moveName = document.querySelector(".moveName p");
const dayOftheWeek = document.querySelector(" .timeTable .dayOftheWeek");
const Month = document.querySelector(".showTime .timeTable .Month");
const dayOftheMonth = document.querySelector(".timeTable .dayOftheMonth");
const time = document.querySelector(".showTime .timeTable .time");
const seats = document.querySelectorAll(".row li");
const selected = document.querySelector(".selectedContainer .selected");
const signOutBtn = document.querySelector(".signOutBtn");
const signInBtn = document.querySelector(".signInBtn");
const userNameNavBar = document.querySelector(".userNameNavBar");
const btnContinue = document.querySelector(".btnContinue");
const overLayBtnContinue = document.querySelector(".overLayBtnContinue");

//this part is to fetch the localStore datas and display hours and date.
const movieData = JSON.parse(localStorage.getItem("dataChosenMovie"));
const reservationDate = JSON.parse(localStorage.getItem("reservationDate"));
const sectionTime = JSON.parse(localStorage.getItem("sectionTime"));

function handleMovieDetails() {
  header[0].style.backgroundImage = `url(${movieData[0].imgPoster})`;
  moveName.innerText = movieData[0].title;
  dayOftheWeek.innerText = reservationDate.weekDayValue + ",";
  Month.innerText = reservationDate.monthValue;
  dayOftheMonth.innerText = reservationDate.dayMonthValue + ",";
  time.innerText = sectionTime;
}
handleMovieDetails();

let seatMovie2 = JSON.parse(localStorage.getItem("arraySeatLocalStorage")) || [];
if (seatMovie2.length > 0) {
  selected.innerHTML = " ";
  seatMovie2.forEach((seatElement) => {
    selected.innerHTML += " ";
    selected.innerHTML += `${seatElement}`;
  });
}

//this part is to pick the seats and send them to localStore.
let arraySeatStorage = JSON.parse(localStorage.getItem("arraySeatLocalStorage")) || [];

for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("click", (element) => {
    let seatTarget = element.currentTarget;

    // if the seatTarget id is one of the empty seats it will stop the code
    let seatID = seatTarget.id;
    if (seatID.includes("seatEmpty")) {
      return;
    } else {
      //if the user click on the seat that has alredy been chosen it will be deleted from local storage. The id of the target (chair) is the letter and number of the chair. It indicates the chair location.
      if (arraySeatStorage.includes(seatTarget.id)) {
        let seatFiltered = arraySeatStorage.filter((eleMentId) => !eleMentId.includes(seatTarget.id));
        arraySeatStorage = seatFiltered;
        localStorage.setItem("arraySeatLocalStorage", JSON.stringify(arraySeatStorage));
        if (seatFiltered.length === 0) {
          btnContinue.style.display = "none";
        } else {
          btnContinue.style.display = "block";
        }
      } else {
        //include a new seat to local storage. The max number to be choose is 7.
        if (arraySeatStorage.length < 7) {
          arraySeatStorage.push(seatTarget.id);
          localStorage.setItem("arraySeatLocalStorage", JSON.stringify(arraySeatStorage));
        }
      }

      //here is to remove the red mark of the seat that has been chosen. The max number to be choose is 7.
      if (arraySeatStorage.length < 7) {
        if (seatTarget.classList.contains("unavailable")) {
          seatTarget.classList.remove("unavailable");
          seatTarget.querySelector(".armLeft").classList.remove("unavailable");
          seatTarget.querySelector(".armRight").classList.remove("unavailable");
        } else {
          seatTarget.classList.add("unavailable");
          seatTarget.querySelector(".armLeft").classList.add("unavailable");
          seatTarget.querySelector(".armRight").classList.add("unavailable");

          let seatMovie = JSON.parse(localStorage.getItem("arraySeatLocalStorage"));
          if (seatMovie.length > 0) {
            btnContinue.style.display = "block";
          }
        }
      }

      //this is to deploy the seat's places.
      deploidSeats();
      unavailableSeatFunction();
    }
  });
}

//This functions is to mark seats unavailable in case the page gets refreshed.
function unavailableSeatFunction() {
  const selectedSeats = [];
  for (let i = 0; i < seats.length; i++) {
    //if there is one or more seats in the localStorage the continiue button appears.
    if (arraySeatStorage.length > 0) {
      btnContinue.style.display = "block";
    }

    //to select from all seats (li) the ones selected and give them the unavailable class.
    if (arraySeatStorage.includes(seats[i].id)) {
      selectedSeats.push(seats[i]);
    }
  }

  selectedSeats.forEach((element) => {
    return (
      element.classList.add("unavailable"),
      element.querySelector(".armLeft").classList.add("unavailable"),
      element.querySelector(".armRight").classList.add("unavailable")
    );
  });
}
unavailableSeatFunction();

//this is to deploy the seat's places.
function deploidSeats() {
  seatMovie2 = JSON.parse(localStorage.getItem("arraySeatLocalStorage"));

  if (seatMovie2 && seatMovie2.length > 0) {
    selected.innerHTML = " ";
    seatMovie2.forEach((seatElement) => {
      selected.innerHTML += " ";
      selected.innerHTML += `
    ${seatElement}`;
    });
  } else {
    selected.innerHTML = "None Selected";
  }
}

//this code is to set the number of chairs (half and full price) located in the checkout page to zero.
btnContinue.addEventListener("click", () => {
  localStorage.setItem("numberOfHalfPriceSeats", JSON.stringify(0));
  localStorage.setItem("numberOfFullPriceSeats", JSON.stringify(0));
});

//----------------- Login authentification-------------------------------------------

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
      overLayBtnContinue.style.display = "none";

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
      overLayBtnContinue.style.display = "block";
      overLayBtnContinue.addEventListener("click", () => {
        location.href = "../logIn_signUp/login.html";
      });
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
//capture the page path the user was on when press sign in btn, for later on come back to it automatically.
overLayBtnContinue.addEventListener("click", () => {
  localStorage.setItem("lastPage", JSON.stringify("../seatSection/seatSection.html"));
});
