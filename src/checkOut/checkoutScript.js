const signOutBtn = document.querySelector(".signOutBtn");
const signInBtn = document.querySelector(".signInBtn");
const userNameNavBar = document.querySelector(".userNameNavBar");
const plusInteira = document.querySelector(".plusInteira");
const minusInteira = document.querySelector(".minusInteira");
const plusMeia = document.querySelector(".plusMeia");
const minusMeia = document.querySelector(".minusMeia");
const numberInteira = document.querySelector(".numberInteira");
const numberMeia = document.querySelector(".numberMeia");
const ticketQtd = document.querySelector(".ticketQtd");
const finalBill = document.querySelector(".finalBill");
const paymentContainerOverLay = document.querySelector(".paymentContainerOverLay");
const chooseTicket = document.querySelector(".chooseTicket");
const cCardnumber = document.getElementById("cCardnumber");
const cardMonthValid = document.getElementById("cardMonthValid");
const cardYearValid = document.getElementById("cardYearValid");
const cvc = document.getElementById("cvc");
const finalizar = document.querySelector(".finalizar");
const warning = document.querySelector(".warning");
const valorTotal = document.querySelector(".valorTotal");

//----------------- Poltronas Numeros displayed----------------------------------------------------------
const seats = document.querySelector(".seats");
const poltronas = JSON.parse(localStorage.getItem("arraySeatLocalStorage"));

poltronas.forEach((seat) => {
  seats.innerHTML += " ";
  seats.innerHTML += `
  <div class="seat">${seat}</div>
  `;
});

//----------------- Info of the tickets ------------------------------------------------
const title = document.querySelector(".title");
const img = document.querySelector(".topBox img");
const day = document.querySelector(".day");
const mes = document.querySelector(".mes");
const time = document.querySelector(".time");

let reservationDate = JSON.parse(localStorage.getItem("reservationDate"));
let dataChosenMovie = JSON.parse(localStorage.getItem("dataChosenMovie"));
console.log(dataChosenMovie);
window.addEventListener("load", () => {
  img.src = dataChosenMovie[0].img;
  title.innerHTML = dataChosenMovie[0].title;
  day.innerHTML = reservationDate.dayMonthValue + " " + "/";
  mes.innerHTML = reservationDate.monthValue + " " + "/";

  if (numberOFtickets.length <= 9) {
    ticketQtd.innerHTML = "0" + numberOFtickets.length;
  } else {
    ticketQtd.innerHTML = numberOFtickets.length;
  }
});

//----------------- Add and Sub number of tickets ---------------------------------------
let numberOFtickets = JSON.parse(localStorage.getItem("arraySeatLocalStorage"));

let numberOfFullPriceSeat = JSON.parse(localStorage.getItem("numberOfFullPriceSeats"));
let numberOfHalfPriceSeat = JSON.parse(localStorage.getItem("numberOfHalfPriceSeats"));

let numberFull = numberOfFullPriceSeat;
let numberHalf = numberOfHalfPriceSeat;

[minusInteira, plusInteira, plusMeia, minusMeia].forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let elementTargt = e.target;

    // --------------------------------Entrad Inteiria-------------------------------------
    if (elementTargt.classList.contains("plusInteira") && numberOFtickets.length > numberFull + numberHalf) {
      numberFull++;

      //let fullTicket = numberFull -- This is localStorage not go zero at every reload of the page. LocalStorage receives the variable inside of the function not the one glabaly available.
      let fullTicket = numberFull;

      localStorage.setItem("numberOfFullPriceSeats", JSON.stringify(fullTicket));
      upDateHalf_FullPriceTickets();
    } else if (elementTargt.classList.contains("minusInteira") && numberFull > 0) {
      numberFull--;

      let fullTicket = numberFull;

      localStorage.setItem("numberOfFullPriceSeats", JSON.stringify(fullTicket));
      upDateHalf_FullPriceTickets();

      // -----------------------------------Meia Entrada---------------------------------
    } else if (elementTargt.classList.contains("plusMeia") && numberOFtickets.length > numberHalf + numberFull) {
      numberHalf++;
      let halfTicket = numberHalf;

      localStorage.setItem("numberOfHalfPriceSeats", JSON.stringify(halfTicket));
      upDateHalf_FullPriceTickets();
    } else if (elementTargt.classList.contains("minusMeia") && numberHalf > 0) {
      numberHalf--;

      upDateHalf_FullPriceTickets();
      let halfTicket = numberHalf;

      localStorage.setItem("numberOfHalfPriceSeats", JSON.stringify(halfTicket));
      upDateHalf_FullPriceTickets();
    }
  });
});

//----------------- Total bill --------------------------------------------------

//this is to make sure the tickets numbers will remain the same even i=f the user reload r leave and come back the page.
window.addEventListener("load", () => {
  upDateHalf_FullPriceTickets();
});

function upDateHalf_FullPriceTickets() {
  //Up date half and full price tickets numbers.
  let numberOfHalfPriceSeats = JSON.parse(localStorage.getItem("numberOfHalfPriceSeats"));
  let numberOfFullPriceSeats = JSON.parse(localStorage.getItem("numberOfFullPriceSeats"));
  if (!numberOfHalfPriceSeats && !numberOfFullPriceSeats) {
    numberInteira.innerText = "0";
    numberMeia.innerText = "0";
  } else if (!numberOfFullPriceSeats && numberOfHalfPriceSeats) {
    numberInteira.innerText = "0";
    numberMeia.innerHTML = numberOfHalfPriceSeats;
  } else if (numberOfFullPriceSeats && !numberOfHalfPriceSeats) {
    numberMeia.innerText = "0";
    numberInteira.innerHTML = numberOfFullPriceSeats;
  } else {
    numberInteira.innerHTML = numberOfFullPriceSeats;
    numberMeia.innerHTML = numberOfHalfPriceSeats;
  }

  //Also Update the final bill.
  let total = 0;
  total = numberOfFullPriceSeats * 40 + numberOfHalfPriceSeats * 20;
  finalBill.innerHTML = "R$" + total + ",00";
  valorTotal.innerHTML = "R$" + total + ",00";

  //---------------------------------------------------------------------------------
  //Make the payment section available only if the user chooses the type of ticktes he/she is purchasing.
  if (Number(ticketQtd.innerHTML) <= 9 && Number(ticketQtd.innerHTML) == Number(numberOfHalfPriceSeats) + Number(numberOfFullPriceSeats)) {
    paymentContainerOverLay.style.display = "none";
    chooseTicket.style.display = "none";
  } else if (Number(ticketQtd.innerHTML) >= 10 && Number(ticketQtd.innerHTML) == Number(numberOfHalfPriceSeats) + Number(numberOfFullPriceSeats)) {
    paymentContainerOverLay.style.display = "none";
  } else {
    paymentContainerOverLay.style.display = "block";
    chooseTicket.style.display = "block";
  }
}

//------------------------Payment section-------------------------------------------------
finalizar.addEventListener("click", () => {
  const cardNumber = cCardnumber.value;
  const cardMonth = cardMonthValid.value;
  const cardYear = cardYearValid.value;
  const cvcCard = cvc.value;

  let handleFinalpage = false;

  if (cardNumber.length === 19 && cardMonth.length === 2 && cardYear.length === 2 && cvcCard.length === 3) {
    warning.style.display = "none";
    handleFinalpage = false;
  } else {
    warning.style.display = "block";
    handleFinalpage = true;
  }
  if (!handleFinalpage) {
    location.href = "../ticketPage/ticketPAge.html";
  }
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
      location.href = "../logIn_signUp/login.html";
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
checkUserAndRetrieveInfo();
signInBtn.addEventListener("click", () => {
  localStorage.setItem("lastPage", JSON.stringify("../checkOut/checkOutPayment.html"));
});
