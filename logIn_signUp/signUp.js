// //----------------- Login authentification---------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0iaI3AI8Zl8c3qJF0w__aeU4ioxilgBY",
  authDomain: "daskino-af8b4.firebaseapp.com",
  projectId: "daskino-af8b4",
  storageBucket: "daskino-af8b4.appspot.com",
  messagingSenderId: "126714622435",
  appId: "1:126714622435:web:d9586830e3bdf1b5d230d6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function signUpuser(e) {
  e.preventDefault();
  let emailSignUp = document.getElementById("emailSignUp").value;
  let passwordSignUp = document.getElementById("passwordSignUp").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;

  createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp).then((userCredential) => {
    var ref = setDoc(doc(db, "UserAuthList", userCredential.user.uid), {
      FirstName: firstName,
      LastName: lastName,
    });
  });
  window.location.href = "./login.html";
  // emailSignUp.innerHTML = " ";
  // passwordSignUp.innerHTML = " ";
  // firstName.innerHTML = " ";
  // lastName.innerHTML = " ";
}

const enter = document.querySelector(".enter");
enter.addEventListener("click", signUpuser);
