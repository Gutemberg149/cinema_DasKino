const dateConteinar = document.querySelector(".dateConteinar");
const title = document.querySelector(".containerTrailer .title ");
const video_container = document.querySelector(".video_container");
const playingStatus = document.querySelector(".playingStatus");
const durationTime = document.querySelector(".durationTime");
const director = document.querySelector(".director");
const studio = document.querySelector(".studio");
const synopis = document.querySelector(".synopis");
const goToSeatLink = document.querySelector(".goToSeatLink");
const signOutBtn = document.querySelector(".signOutBtn");
const signInBtn = document.querySelector(".signInBtn");
const userNameNavBar = document.querySelector(".userNameNavBar");
const chooseDateSection = document.querySelector(".chooseDateSection");
const chooseTime1 = document.querySelector(".chooseTime1");
const chooseTime2 = document.querySelector(".chooseTime2");

// This function is to get the id of the movie that has been clicked on in the index page.
let idMovie = 0;
function getIdMovie() {
  if (localStorage.getItem("idItem")) {
    idMovie = JSON.parse(localStorage.getItem("idItem"));
  }
}
getIdMovie();

// First fetch all the movies datas from the json, second function send back to a new localstorage only the selected movie and then the second function uses it's data's to deploy the information
const moviesDetailsFetch = () => {
  fetch("./../../movies.json")
    .then((response) => response.json())
    .then((data) => {
      let listOfMovies = data;
      const chosenMovieData = listOfMovies.filter((movieData) => movieData.id == idMovie);
      localStorage.setItem("dataChosenMovie", JSON.stringify(chosenMovieData));
      upDateMoviePageInfo();
    })
    .catch((error) => console.error("Error fetching data:", error));
};
moviesDetailsFetch();

function upDateMoviePageInfo() {
  const movieData = JSON.parse(localStorage.getItem("dataChosenMovie"));
  title.innerHTML = movieData[0].title;

  video_container.innerHTML = `<iframe title='YouTube video player'  type='text/html' width='100%' height='400' src=${movieData[0].trailer} frameborder='0' allow='autoplay' allowFullScreen></iframe>`;

  playingStatus.innerHTML = movieData[0].playingStatus;
  durationTime.innerHTML = movieData[0].duration;
  director.innerHTML = movieData[0].director;
  studio.innerHTML = movieData[0].studio;
  synopis.innerHTML = movieData[0].synopsis;

  //In this snipt of code is to set differebt movie times depending on the chosen movie.
  const timeTable1 = document.querySelector(".timeTable1");
  const timeTable2 = document.querySelector(".timeTable2");

  if (movieData[0].timeTable === true) {
    timeTable1.style.display = "none";
    timeTable2.style.display = "block";
  } else {
    timeTable1.style.display = "block";
    timeTable2.style.display = "none";
  }
}

//Deploying 14 days of dates---------------------------------------------
const date = new Date();
let weekDayNumber = date.getDay();
let dayMonth = date.getDate();
let month = date.getMonth();

let calendar = [];
function handlingDate() {
  let dayOftheWeekName;
  let monthName;

  for (let i = 0; i < 14; i++) {
    // switch case to name day of the week.
    switch (weekDayNumber) {
      case (weekDayNumber = 0):
        dayOftheWeekName = "Sunday";
        break;
      case (weekDayNumber = 1):
        dayOftheWeekName = "Monday";
        break;
      case (weekDayNumber = 2):
        dayOftheWeekName = "Tuesday";
        break;
      case (weekDayNumber = 3):
        dayOftheWeekName = "Wednesday";
        break;
      case (weekDayNumber = 4):
        dayOftheWeekName = "Thursday";
        break;
      case (weekDayNumber = 5):
        dayOftheWeekName = "Friday";
        break;
      case (weekDayNumber = 6):
        dayOftheWeekName = "Saturday";
        break;

      default:
        break;
    }
    // switch case to name the month.
    switch (month) {
      case (month = 0):
        monthName = "Jan";
        break;
      case (month = 1):
        monthName = "Feb";
        break;
      case (month = 2):
        monthName = "Mar";
        break;
      case (month = 3):
        monthName = "Apr";
        break;
      case (month = 4):
        monthName = "May";
        break;
      case (month = 5):
        monthName = "Jun";
        break;
      case (month = 6):
        monthName = "Jul";
        break;
      case (month = 7):
        monthName = "Aug";
        break;
      case (month = 8):
        monthName = "Sep";
        break;
      case (month = 9):
        monthName = "Oct";
        break;
      case (month = 10):
        monthName = "Nov";
        break;
      case (month = 11):
        monthName = "Dec";

        break;

      default:
        break;
    }
    //array to populate the calendar.
    calendar[i] = {
      dayOftheWeekNameKey: dayOftheWeekName,
      dayOfTheMonth: dayMonth,
      month: monthName,
    };

    //this 'if' is to updade the months day and week day name.
    if (month === 0) {
      if (dayMonth < 31) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 1) {
      if (dayMonth < 28) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 2) {
      if (dayMonth < 31) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 3) {
      if (dayMonth < 30) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 4) {
      if (dayMonth < 31) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 5) {
      if (dayMonth < 30) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 0;
      }
    } else if (month === 6) {
      if (dayMonth < 30) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 7) {
      if (dayMonth < 30) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 8 && dayMonth < 31) {
      if (dayMonth < 31) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 9 && dayMonth < 31) {
      if (dayMonth < 31) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 10) {
      if (dayMonth < 30) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    } else if (month === 11) {
      if (dayMonth < 31) {
        dayMonth++;
        if (weekDayNumber < 6) {
          weekDayNumber++;
        } else {
          weekDayNumber = 0;
        }
      } else {
        month++;
        dayMonth = 1;
      }
    }
  }
}
handlingDate();

const handlingTheDates = () => {
  dateConteinar.innerHTML = "";

  calendar.forEach((weekDay) => {
    const dateBox = document.createElement("div");
    dateBox.classList.add("date");
    dateBox.innerHTML = `
           <p class="weekDay">${weekDay.dayOftheWeekNameKey}</p>
           <div class="monthBox">
             <p class="dayMonth">${weekDay.dayOfTheMonth}</p>
             <p class="month">${weekDay.month}</p>
         </div>
           `;
    dateConteinar.appendChild(dateBox);
  });
};
handlingTheDates();

//this snipt of code is to display or not the link to seat section.
let dateSelected = false;
let timeSelected = false;

function handleGoToSeatLink() {
  if (!dateSelected || !timeSelected) {
    goToSeatLink.style.display = "none";
  } else {
    goToSeatLink.style.display = "block";
  }
}

function dateSigns() {
  if (!dateSelected) {
    chooseDateSection.style.display = "block";
  } else {
    chooseDateSection.style.display = "none";
  }
}
function timeSigns() {
  if (!timeSelected) {
    chooseTime1.style.display = "block";
    chooseTime2.style.display = "block";
  } else {
    chooseTime1.style.display = "none";
    chooseTime2.style.display = "none";
  }
}

//In this part we select the date hilighting it and saving it in LocalStorage

const dates = document.querySelectorAll(".date");
for (let i = 0; i < dates.length; i++) {
  dates[i].addEventListener("click", (element) => {
    for (let i = 0; i < dates.length; i++) {
      dates[i].querySelector(".weekDay").classList.remove("highLight");
      dates[i].querySelector(".dayMonth").classList.remove("highLight");
      dates[i].querySelector(".month").classList.remove("highLight");
    }
    let dateTarget = element.currentTarget;
    dateTarget.querySelector(".weekDay").classList.add("highLight");
    dateTarget.querySelector(".dayMonth").classList.add("highLight");
    dateTarget.querySelector(".month").classList.add("highLight");

    dateSelected = true;

    handleGoToSeatLink();
    dateSigns();
    timeSigns();

    const dayMonthValue = dateTarget.querySelector(".dayMonth").innerHTML;
    const monthValue = dateTarget.querySelector(".month").innerHTML;
    const weekDayValue = dateTarget.querySelector(".weekDay").innerHTML;
    const reservationDate = {
      dayMonthValue,
      monthValue,
      weekDayValue,
    };
    localStorage.setItem("reservationDate", JSON.stringify(reservationDate));
  });
}

//This part we select the time hilighting it and saving it in LocalStorage
const boxsTime = document.querySelectorAll(".boxtime");

for (let i = 0; i < boxsTime.length; i++) {
  boxsTime[i].addEventListener("click", (element) => {
    for (let i = 0; i < boxsTime.length; i++) {
      boxsTime[i].classList.remove("highLightBoxTime");
    }

    timeSelected = true;
    handleGoToSeatLink();
    dateSigns();
    timeSigns();

    let timeTarget = element.currentTarget;
    timeTarget.classList.add("highLightBoxTime");
    let timeTargetValue = timeTarget.innerHTML;
    localStorage.setItem("sectionTime", JSON.stringify(timeTargetValue));
  });
}

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
signInBtn.addEventListener("click", () => {
  localStorage.setItem("lastPage", JSON.stringify("../moviePage/moviePage.html"));
});
