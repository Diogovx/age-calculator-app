const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const yearSpan = document.querySelector("#span-years");
const monthSpan = document.querySelector("#span-months");
const daySpan = document.querySelector("#span-days");
const button = document.querySelector("#button");
const smalls = document.querySelectorAll(".input-block small");

function limiterDay() {
  if (day.value < 0) day.value = 0;
  if (day.value > 31) day.value = 31;
}

function limiterMonth() {
  if (month.value < 1) month.value = 1;
  if (month.value > 12) month.value = 12;
}

function limiterYear() {
  if (year.value > 9999) year.value = 2023;
}

day.addEventListener("keyup", limiterDay);
month.addEventListener("keyup", limiterMonth);
year.addEventListener("keyup", limiterYear);

button.addEventListener("click", () => {
  resetError();
  if (day.value == "" || month.value == "" || year.value == "") {
    error();
    return;
  }

  let birthDate = new Date(`${month.value}/${day.value}/${year.value}`);
  console.log(birthDate);
  dateCalc(birthDate);
});

function dateCalc(birthDate) {
  const currentDate = getCurrentDates();
  const userAge = getBirthDates(birthDate);

  const yearAge = currentDate[2] - userAge[2];
  yearSpan.innerText = yearAge;

  let monthAge;
  if (currentDate[1] >= userAge[1]) {
    monthAge = currentDate[1] - userAge[1];
    monthSpan.innerText = monthAge;
  } else {
    monthAge = 12 + currentDate[1] - userAge[1];
    monthSpan.innerText = monthAge;
  }

  let dayAge;
  if (currentDate[0] >= userAge[0]) {
    dayAge = currentDate[0] - userAge[0];
    daySpan.innerText = dayAge;
  } else {
    monthAge--;
    dayAge = 31 + currentDate[0] - userAge[0];
    if (monthAge < 0) {
      monthAge = 12;
      yearAge--;
    }
    daySpan.innerText = dayAge;
  }
}

function getCurrentDates() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  return [currentDay, currentMonth, currentYear];
}
function getBirthDates(birthDate) {
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  return [birthDay, birthMonth, birthYear];
}

function error() {
  /*for(small of smalls){
        small.className = 'error'
        small.innerText = 'This field is required'
    }
    day.className += 'errorInput'
    month.className += 'errorInput'
    year.className += 'errorInput'
    day.parentElement.children[0].className += 'error'
    month.parentElement.children[0].className += 'error'
    year.parentElement.children[0].className += 'error'*/
  if (day.value == "" && day.className != "errorInput") {
    day.classList.add("errorInput");
    day.parentElement.children[0].className += "error";
    smalls[0].className = "error";
    smalls[0].innerText = "This field is required";
  }
  if (month.value == "" && month.className != "errorInput") {
    month.classList.add("errorInput");
    month.parentElement.children[0].className += "error";
    smalls[1].className = "error";
    smalls[1].innerText = "This field is required";
  }
  if (year.value == "" && year.className != "errorInput") {
    year.classList.add("errorInput");
    year.parentElement.children[0].className += "error";
    smalls[2].className = "error";
    smalls[2].innerText = "This field is required";
  }
}
function resetError() {
  day.classList.remove("errorInput");
  day.parentElement.children[0].classList.remove("error");
  smalls[0].classList.remove("error");

  month.classList.remove("errorInput");
  month.parentElement.children[0].classList.remove("error");
  smalls[1].classList.remove("error");

  year.classList.remove("errorInput");
  year.parentElement.children[0].classList.remove("error");
  smalls[2].classList.remove("error");

  yearSpan.innerText = "--";
  monthSpan.innerText = "--";
  daySpan.innerText = "--";
}
