const moviePlayinContainer = document.querySelector(".moviePlayinContainer");

const allMovies = document.querySelector(".allMoviesSpan");
const playingNow = document.querySelector(".playingNowSpan");
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

// These three variables are for display in the main page the selection of movies, they are used in addEventListener bellow.
let showAllmovies = true;
let showPlayingNow = false;
let showComingSoon = false;

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
      // console.log(movieBoxContainer);
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
  fetch("./../movies.json")
    .then((response) => response.json())
    .then((data) => {
      listOfMovies = data;
      moviesInfoDeploy();
    })
    .catch((error) => console.error("Error fetching data:", error));
};
moviesDetailsFetch();

document.querySelector(".video_container").innerHTML =
  "<iframe title='YouTube video player'  type='text/html' width='100%' height='400' src='http://www.youtube.com/embed/d9MyW72ELq0' frameborder='0' allow='autoplay' allowFullScreen></iframe>";

closeModal.addEventListener("click", () => {
  const iframe = document.querySelector("iframe");
  iframe.src = iframe.src;
});

//video modal do avatar no home.
import toggleModal from "./videoCodes.js";

//----------------- Login authentification---------------------------------------

let signOut = () => {
  localStorage.removeItem("user-info");
  localStorage.removeItem("sectionTime");
  localStorage.removeItem("reservationDate");
  localStorage.removeItem("idItem");
  localStorage.removeItem("dataChosenMovie");
  localStorage.removeItem("arraySeatLocalStorage");

  window.location.href = "../index/index.html";
};

let checkCredentials = () => {
  if (localStorage.getItem("user-info")) {
    let userNameValue = JSON.parse(localStorage.getItem("user-info"));
    const userName = Object.values(userNameValue).toString();
    userNameNavBar.innerHTML = `${userName}`;

    signOutBtn.style.display = "flex";
    signInBtn.style.display = "none";
  }

  if (!localStorage.getItem("user-info")) {
    signOutBtn.style.display = "none";
    signInBtn.style.display = "flex";
  }
};

window.addEventListener("load", checkCredentials);
signOutBtn.addEventListener("click", signOut);
