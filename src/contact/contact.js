const signOutBtn = document.querySelector(".signOutBtn");
const signInBtn = document.querySelector(".signInBtn");
const userNameNavBar = document.querySelector(".userNameNavBar");
const form = document.querySelector("form");
let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userText = document.getElementById("textarea");
const btnSubmit = document.getElementById("btnSubmit");
const error = document.querySelector(".noteInforming .error");
const success = document.querySelector(".noteInforming .success");
console.log(form);
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const userNameValue = userName.value;
  const userEmailValue = userEmail.value;
  const userTextValue = userText.value;

  if (userNameValue !== "" && userEmailValue !== "" && userTextValue !== "") {
    //This https below is just a exemplo of sending a form using a formData. The values can be sent to a server.

    const formData = new FormData(form);

    for (const item of formData) {
      console.log(item[0], item[1]);
    }
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    //--------------------------------------------------

    error.style.display = "none";
    success.style.display = "block";

    userName.value = "";
    userEmail.value = "";
    userText.value = "";
  } else {
    error.style.display = "block";
    success.style.display = "none";
  }
});
//----------------- Login authentification---------------------------------------

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

//capture the page path the user was on when press sign in btn, for later on come back to it automatically.
checkUserAndRetrieveInfo();
signInBtn.addEventListener("click", () => {
  localStorage.setItem("lastPage", JSON.stringify("../contact/contact.html"));
});
