const header = document.getElementsByTagName("header");
const moveName = document.querySelector(".moveName p");
const showTimeTop = document.querySelector(".showTime .top");
const dayOftheWeek = document.querySelector(" .timeTable .dayOftheWeek");
const Month = document.querySelector(".showTime .timeTable .Month");
const dayOftheMonth = document.querySelector(".timeTable .dayOftheMonth");
const time = document.querySelector(".showTime .timeTable .time");
const seats = document.querySelectorAll(".row li");
const titleSelected = document.querySelector(".selectedContainer .titleSelected");
const selected = document.querySelector(".selectedContainer .selected");
const linkContiue = document.querySelector(".linkContiue");

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

//this part is to pick the seats and send them to localStore.

let arraySeatStorage = [];
function handleSelectSeats() {
  for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener("click", (element) => {
      let seatTarget = element.currentTarget;

      //if the user click on the seat that has alredy been chosen it will be deleted from local storage.
      if (arraySeatStorage.includes(seatTarget.id)) {
        let seatFiltered = arraySeatStorage.filter((eleMentId) => !eleMentId.includes(seatTarget.id));
        arraySeatStorage = seatFiltered;
        localStorage.setItem("arraySeatLocalStorage", JSON.stringify(arraySeatStorage));
        if (seatFiltered.length === 0) {
          linkContiue.style.display = "none";
        }
      }

      //here is to remove the red mark of the seat that has been chosen.
      if (seatTarget.classList.contains("unavailable")) {
        seatTarget.classList.remove("unavailable");
        seatTarget.querySelector(".armLeft").classList.remove("unavailable");
        seatTarget.querySelector(".armRight").classList.remove("unavailable");
      } else {
        seatTarget.classList.add("unavailable");
        seatTarget.querySelector(".armLeft").classList.add("unavailable");
        seatTarget.querySelector(".armRight").classList.add("unavailable");

        //set a new seat to local storage.
        arraySeatStorage.push(seatTarget.id);
        localStorage.setItem("arraySeatLocalStorage", JSON.stringify(arraySeatStorage));

        let seatMovie = JSON.parse(localStorage.getItem("arraySeatLocalStorage"));
        if (seatMovie.length > 0) {
          linkContiue.style.display = "block";
        }
        let seatArray = [];

        //this is to deploy the seat's places.
        for (let i = 0; i < seatMovie.length; i++) {
          seatArray.push(" " + seatMovie[i] + " ");
          let seatArrayConfigured = seatArray.join(",");
          selected.innerText = seatArrayConfigured;
        }
      }
    });
  }
}
handleSelectSeats();
