/* ---------------------------- Global Variables ---------------------------- */
const API_Key = "f0013059706842a8a97191844240812";
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var searchBar = document.querySelector("#locationHolder");
var search = document.querySelector("#location");
var newsHolder = document.querySelector("#newsLetter");
var news = document.querySelector("#newEmail");
var weekDaysHTML = document.querySelectorAll(".weekDay");
var monthDay = document.querySelector(".monthDay");

// Cards
var firstCard = {
  title: document.querySelector("#firstCard .card-title"),
  degree: document.querySelector("#firstCard #degree"),
  img: document.querySelector("#firstCard .img img"),
  weatherStatus: document.querySelector("#firstCard .clouds"),
  humidity: document.querySelector("#firstCard .wind-item:nth-child(1) span"),
  windSpeed: document.querySelector("#firstCard .wind-item:nth-child(2) span"),
  windDirection: document.querySelector(
    "#firstCard .wind-item:nth-child(3) span"
  ),
};
var otherCards = {
  img: document.querySelectorAll(".otherCard .img img"),
  maxDegree: document.querySelectorAll(".otherCard span.degree > span"),
  minDegree: document.querySelectorAll(".otherCard span.degree-small > span"),
  weatherStatus: document.querySelectorAll(".otherCard .clouds"),
};

/* ---------------------------------- Logic --------------------------------- */
searchBar.addEventListener("click", function () {
  search.focus();
});
newsHolder.addEventListener("click", function () {
  news.focus();
});

// Weather data splitting
getCity("cairo");
search.addEventListener("keyup", function () {
  var cityInitials = search.value;
  getCity(cityInitials);
});

/* -------------------------------- Functions ------------------------------- */
async function fetching(city) {
  var link = `https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${city}&days=3`;
  var response = await fetch(link);
  var data = await response.json();

  var dayData = [
    {
      day: data.forecast.forecastday[0].day,
      date: data.forecast.forecastday[0].date,
      current: data.current,
      location: city,
    },
    {
      day: data.forecast.forecastday[1].day,
      date: data.forecast.forecastday[1].date,
    },
    {
      day: data.forecast.forecastday[2].day,
      date: data.forecast.forecastday[2].date,
    },
  ];

  displayDays(dayData);
}

function displayDays(dayData) {
  // Setting month
  var d = new Date(dayData[0].date);
  monthDay.innerHTML = `${d.getDate()} - ${months[d.getMonth()]}`;

  // Setting days
  for (let i = 0; i < dayData.length; i++) {
    d = new Date(dayData[i].date);
    weekDaysHTML[i].innerHTML = weekDays[d.getDay()];

    if (i != 0) {
      // Setting other cards
      otherCards.img[i - 1].src = dayData[i].day.condition.icon;
      otherCards.weatherStatus[i - 1].innerHTML = dayData[i].day.condition.text;
      otherCards.maxDegree[i - 1].innerHTML = dayData[i].day.maxtemp_c;
      otherCards.minDegree[i - 1].innerHTML = dayData[i].day.mintemp_c;
    }
  }

  // Setting first card
  firstCard.title.innerHTML = dayData[0].location;
  firstCard.degree.innerHTML = dayData[0].current.temp_c;
  firstCard.weatherStatus.innerHTML = dayData[0].current.condition.text;
  firstCard.humidity.innerHTML = dayData[0].current.humidity + "%";
  firstCard.windSpeed.innerHTML = dayData[0].current.wind_kph + "km/h";
  firstCard.img.src = dayData[0].current.condition.icon;

  switch (dayData[0].current.wind_dir) {
    case "NNE":
      firstCard.windDirection.innerHTML = "Northeast East";
      break;
    case "NE":
      firstCard.windDirection.innerHTML = "North East";
      break;
    case "ENE":
      firstCard.windDirection.innerHTML = "East Northeast";
      break;
    case "E":
      firstCard.windDirection.innerHTML = "East";
      break;
    case "ESE":
      firstCard.windDirection.innerHTML = "East Southeast";
      break;
    case "SE":
      firstCard.windDirection.innerHTML = "South East";
      break;
    case "SSE":
      firstCard.windDirection.innerHTML = "South Southeast";
      break;
    case "S":
      firstCard.windDirection.innerHTML = "South";
      break;
    case "SSW":
      firstCard.windDirection.innerHTML = "South Southwest";
      break;
    case "SW":
      firstCard.windDirection.innerHTML = "South West";
      break;
    case "WSW":
      firstCard.windDirection.innerHTML = "West Southwest";
      break;
    case "W":
      firstCard.windDirection.innerHTML = "West";
      break;
    case "WNW":
      firstCard.windDirection.innerHTML = "West Northwest";
      break;
    case "NW":
      firstCard.windDirection.innerHTML = "North West";
      break;
    case "NNW":
      firstCard.windDirection.innerHTML = "North Northwest";
      break;

    default:
      firstCard.windDirection.innerHTML = "North";
  }
}

async function getCity(initials) {
  if (!(initials.length < 1)) {
    var link = `http://api.weatherapi.com/v1/search.json?key=${API_Key}&q=${initials}`;
    var response = await fetch(link);
    var result = await response.json();
    if (result.length > 0) {
      var city = result[0].name;
    }
    if (city != undefined) {
      fetching(city);
    }
  }
}
