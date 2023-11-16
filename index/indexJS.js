const moviePlayinContainer = document.querySelector(".moviePlayinContainer");
const movieBoxContainer = document.querySelector(".movieBoxContainer");
const allMovies = document.querySelector(".allMoviesSpan");
const playingNow = document.querySelector(".playingNowSpan");
const comingSoon = document.querySelector(".comingSoonSpan");
const inputMovieTitle = document.querySelector(".inputMovieTitle");
const alertOfInputError = document.querySelector(".alertOfInputError");
const enter = document.querySelector(".enter");

let listOfMovies = [];
let selectedMovieFromList = [];

// These three variables are for display in the main page the selction of movies, they are used in addEventListener bellow.
let showAllmovies = true;
let showPlayingNow = false;
let showComingSoon = false;

//this snipt of code is to display the chosen movie by pressing the enter key on key board
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

//this snipt of code is to display the chosen movie by pressing the enter buttom written on yhe html page, this option is importante beacuse of the responsiveness as there is no " a easy enter key" on phones.
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
      let movieDiv = document.createElement("div");
      movieDiv.classList.add("movieBoxContainer");
      let bcgPoster = document.createElement("div");
      bcgPoster.classList.add("posterContainer");
      bcgPoster.style.backgroundImage = `url(${movieData.img})`;
      movieDiv.innerHTML = `
     <div class="infoBox">
      <div class="title">${movieData.title}</div>
      <div class="bottomInfo">
        <p class="duration">${movieData.duration}</p>
        <div class="barDivision"></div>
        <p class="typeOfMovie">${movieData.category}</p>
      </div>
    </div>
      `;
      movieDiv.prepend(bcgPoster);
      moviePlayinContainer.appendChild(movieDiv);
    });
  } else if (showPlayingNow === true) {
    allMovies.style.color = "white";
    playingNow.style.color = "red";
    comingSoon.style.color = "white";
    listOfMovies.forEach((movieData) => {
      if (movieData.playing === true) {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movieBoxContainer");
        let bcgPoster = document.createElement("div");
        bcgPoster.classList.add("posterContainer");
        bcgPoster.style.backgroundImage = `url(${movieData.img})`;
        movieDiv.innerHTML = `
      <div class="infoBox">
        <div class="title">${movieData.title}</div>
        <div class="bottomInfo">
          <p class="duration">${movieData.duration}</p>
          <div class="barDivision"></div>
          <p class="typeOfMovie">${movieData.category}</p>
        </div>
      </div>
      `;
        movieDiv.prepend(bcgPoster);
        moviePlayinContainer.appendChild(movieDiv);
      }
    });
  } else if (showComingSoon === true) {
    allMovies.style.color = "wgite";
    playingNow.style.color = "white";
    comingSoon.style.color = "red";
    listOfMovies.forEach((movieData) => {
      if (movieData.playing === false) {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movieBoxContainer");
        let bcgPoster = document.createElement("div");
        bcgPoster.classList.add("posterContainer");
        bcgPoster.style.backgroundImage = `url(${movieData.img})`;
        movieDiv.innerHTML = `
      <div class="infoBox">
        <div class="title">${movieData.title}</div>
        <div class="bottomInfo">
          <p class="duration">${movieData.duration}</p>
          <div class="barDivision"></div>
          <p class="typeOfMovie">${movieData.category}</p>
        </div>
      </div>
      `;
        movieDiv.prepend(bcgPoster);
        moviePlayinContainer.appendChild(movieDiv);
      }
    });
  } else {
    allMovies.style.color = "white";
    playingNow.style.color = "white";
    comingSoon.style.color = "white";
    selectedMovieFromList.forEach((movieData) => {
      let movieDiv = document.createElement("div");
      movieDiv.classList.add("movieBoxContainer");
      let bcgPoster = document.createElement("div");
      bcgPoster.classList.add("posterContainer");
      bcgPoster.style.backgroundImage = `url(${movieData.img})`;
      movieDiv.innerHTML = `
      <div class="infoBox">
        <div class="title">${movieData.title}</div>
        <div class="bottomInfo">
          <p class="duration">${movieData.duration}</p>
          <div class="barDivision"></div>
          <p class="typeOfMovie">${movieData.category}</p>
        </div>
      </div>
      `;
      movieDiv.prepend(bcgPoster);
      moviePlayinContainer.appendChild(movieDiv);
    });
  }
};

// It is important to call the function moviesInfoDeploy to make the fetch work
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

//video modal do avatar no home.
import toggleModal from "./videoCodes.js";
