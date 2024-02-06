const moviePlayinContainer = document.querySelector(".moviePlayinContainer");
const allMovies = document.querySelector(".allMoviesSpan");
const playingNow = document.querySelector(".playingNowSpan");
const playTrailer = document.querySelector(".playTrailer");
const comingSoon = document.querySelector(".comingSoonSpan");
const inputMovieTitle = document.querySelector(".inputMovieTitle");
const alertOfInputError = document.querySelector(".alertOfInputError");
const enter = document.querySelector(".enter");
const closeModal = document.querySelector(".modal_header i");
const userNameNavBar = document.querySelector(".userNameNavBar");
const signOutBtn = document.querySelector(".signOutBtn");
const signInBtn = document.querySelector(".signInBtn");

let listOfMovies = [];
let selectedMovieFromList = [];

// These three variables are to display in the main page the selection of movies, they are used in addEventListener bellow.
let showAllmovies = true;
let showPlayingNow = false;
let showComingSoon = false;

// ----------------------------------------------------------------------------------------------------
//this snipt of code is to display the movie searched movie by pressing the enter key on key board
inputMovieTitle.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && inputMovieTitle.value !== "") {
    selectedMovieFromList = listOfMovies.filter((elem) => {
      const movie = elem.title.toLowerCase().replace(/\s/g, "");
      const inputMovie = inputMovieTitle.value.toLowerCase().replace(/\s/g, "");
      console.log("movie" + " " + movie);
      console.log("inputMovie" + " " + inputMovie);
      return movie === inputMovie;
    });

    // if the movie title was found the code will falsy all 3 variables making the last option true in the moviesInfoDeploy function. The last option uses the selectedMovieFromList array.
    if (selectedMovieFromList.length > 0) {
      showAllmovies = false;
      showPlayingNow = false;
      showComingSoon = false;
      moviesInfoDeploy();
      alertOfInputError.style.display = "none";
    } else {
      // this code is to show the error alert when the input name is wrong
      showAllmovies = true;
      alertOfInputError.style.display = "block";
    }
  }

  // this code is to show the error alert when the input is blank
  if (e.key === "Enter" && inputMovieTitle.value === "") {
    alertOfInputError.style.display = "block";
    showAllmovies = true;
    moviesInfoDeploy();
  }
});

// ----------------------------------------------------------------------------------------------------
//this snipt of code is to display the chosen movie by pressing the enter buttom written on the html page, this option is important beacuse of the responsiveness as there is no "an easy enter key" on mobile phones.
enter.addEventListener("click", () => {
  if (inputMovieTitle.value !== "") {
    selectedMovieFromList = listOfMovies.filter((elem) => {
      const movie = elem.title.toLowerCase().replace(/\s/g, "");
      const inputMovie = inputMovieTitle.value.toLowerCase().replace(/\s/g, "");
      console.log("movie" + " " + movie);
      console.log("inputMovie" + " " + inputMovie);
      return movie === inputMovie;
    });

    // if the movie title was found the code will falsy all 3 variables making the last option true in the moviesInfoDeploy function. The last option uses the selectedMovieFromList array.
    if (selectedMovieFromList.length > 0) {
      showAllmovies = false;
      showPlayingNow = false;
      showComingSoon = false;
      moviesInfoDeploy();
      alertOfInputError.style.display = "none";
    } else {
      // this code is to show the error alert when the input name is wrong
      showAllmovies = true;
      alertOfInputError.style.display = "block";
    }
  }

  // this code is to show the error alert when the input is blank
  if (e.key === "Enter" && inputMovieTitle.value === "") {
    alertOfInputError.style.display = "block";
    showAllmovies = true;
    moviesInfoDeploy();
  }
});

allMovies.addEventListener("click", () => {
  (showAllmovies = true), (showPlayingNow = false), (showComingSoon = false);
  moviesInfoDeploy();
  alertOfInputError.style.display = "none";
  inputMovieTitle.value = "";
});

playingNow.addEventListener("click", () => {
  (showAllmovies = false), (showPlayingNow = true), (showComingSoon = false);
  moviesInfoDeploy();
  alertOfInputError.style.display = "none";
  inputMovieTitle.value = "";
});

comingSoon.addEventListener("click", () => {
  (showAllmovies = false), (showPlayingNow = false), (showComingSoon = true);
  moviesInfoDeploy();
  alertOfInputError.style.display = "none";
  inputMovieTitle.value = "";
});

const moviesInfoDeploy = () => {
  moviePlayinContainer.innerHTML = "";
  if (showAllmovies === true) {
    allMovies.style.color = "red";
    playingNow.style.color = "white";
    comingSoon.style.color = "white";
    listOfMovies.forEach((movieData) => {
      let movieBoxContainer = document.createElement("div");
      movieBoxContainer.classList.add("movieBoxContainer");
      movieBoxContainer.dataset.id = movieData.id;
      movieBoxContainer.innerHTML = `
      <a href="../moviePage/moviePage.html">
            <div class="posterContainer">
            <img src=${movieData.img} alt="">
            </div>
            </a>
          <div class="infoBox">
            <div class="title">${movieData.title}</div>
            <div class="bottomInfo">
              <p class="duration">${movieData.duration}</p>
              <div class="barDivision"></div>
              <p class="typeOfMovie">${movieData.category}</p>
            </div>
          </div>
      `;
      movieBoxContainer.addEventListener("click", (elemt) => {
        let positionclick = elemt.currentTarget;
        let movie_id = positionclick.dataset.id;
        localStorage.setItem("idItem", JSON.stringify(movie_id));
      });

      moviePlayinContainer.appendChild(movieBoxContainer);
    });
  } else if (showPlayingNow === true) {
    allMovies.style.color = "white";
    playingNow.style.color = "red";
    comingSoon.style.color = "white";
    listOfMovies.forEach((movieData) => {
      if (movieData.playing === true) {
        let movieBoxContainer = document.createElement("div");
        movieBoxContainer.classList.add("movieBoxContainer");

        movieBoxContainer.innerHTML = `
        <a href="../moviePage/moviePage.html">
          <div class="posterContainer">
          <img src=${movieData.img} alt="">
          </div>
        </a>
        <div class="infoBox">
          <div class="title">${movieData.title}</div>
          <div class="bottomInfo">
            <p class="duration">${movieData.duration}</p>
            <div class="barDivision"></div>
            <p class="typeOfMovie">${movieData.category}</p>
          </div>
        </div>
    `;

        moviePlayinContainer.appendChild(movieBoxContainer);
      }
    });
  } else if (showComingSoon === true) {
    allMovies.style.color = "wgite";
    playingNow.style.color = "white";
    comingSoon.style.color = "red";
    listOfMovies.forEach((movieData) => {
      if (movieData.playing === false) {
        let movieBoxContainer = document.createElement("div");
        movieBoxContainer.classList.add("movieBoxContainer");

        movieBoxContainer.innerHTML = `
        <a href="../moviePage/moviePage.html">
          <div class="posterContainer">
          <img src=${movieData.img} alt="">
          </div>
        </a>
        <div class="infoBox">
          <div class="title">${movieData.title}</div>
          <div class="bottomInfo">
            <p class="duration">${movieData.duration}</p>
            <div class="barDivision"></div>
            <p class="typeOfMovie">${movieData.category}</p>
          </div>
        </div>
    `;

        moviePlayinContainer.appendChild(movieBoxContainer);
      }
    });
  } else {
    allMovies.style.color = "white";
    playingNow.style.color = "white";
    comingSoon.style.color = "white";
    selectedMovieFromList.forEach((movieData) => {
      let movieBoxContainer = document.createElement("div");
      movieBoxContainer.classList.add("movieBoxContainer");

      movieBoxContainer.innerHTML = `
      <a href="../moviePage/moviePage.html">
        <div class="posterContainer">
        <img src=${movieData.img} alt="">
        </div>
      </a>
      <div class="infoBox">
        <div class="title">${movieData.title}</div>
        <div class="bottomInfo">
          <p class="duration">${movieData.duration}</p>
          <div class="barDivision"></div>
          <p class="typeOfMovie">${movieData.category}</p>
        </div>
      </div>
  `;
      moviePlayinContainer.appendChild(movieBoxContainer);
    });
  }
};

// It is important to call the function moviesInfoDeploy to make the fetch work.
const moviesDetailsFetch = () => {
  fetch("./../../movies.json")
    .then((response) => response.json())
    .then((data) => {
      listOfMovies = data;
      moviesInfoDeploy();
    })
    .catch((error) => console.error("Error fetching data:", error));
};
moviesDetailsFetch();
// -------------------Video trailer--------------------------------------------------

//video modal do avatar no home. To bring the modal window down and display the trailer.
import toggleModal from "./videoCodes.js";

//----------------------Fire Base Auth--------------------------------------------------
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
//capture the page path the user was on when press sign in btn, for later on come back to it automatically.
checkUserAndRetrieveInfo();
signInBtn.addEventListener("click", () => {
  localStorage.setItem("lastPage", JSON.stringify("../index/index.html"));
});
