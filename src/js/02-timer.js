import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';    
import { Notify } from 'notiflix/build/notiflix-notify-aio';



   const refs = { 

    inputEl: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    dayEl: document.querySelector('span[data-days]'),
    hourEl: document.querySelector('span[data-hours]'),
    minuteEl: document.querySelector('span[data-minutes]'),
    secondEl: document.querySelector('span[data-seconds]'),


}
const { inputEl, btnStart, dayEl, hourEl, minuteEl, secondEl } = refs;


btnStart.setAttribute('disabled', 'disabled');
let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      const currentTime = Date.now();

      selectedTime = Number(selectedDates[0].getTime());

      if (selectedTime <= currentTime) {
        Notify.failure('Please choose a date in the future');
      }
      else {
          btnStart.removeAttribute('disabled');
      }
    },
};

flatpickr(inputEl, options);


/////

const timer = {
    start() {
        const intervalID = setInterval(() => {
            const currentTime = Date.now();
            const timeLeft = selectedTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(timeLeft);

            updateTimer({ days, hours, minutes, seconds });

            if (timeLeft < 999) {
                clearInterval(intervalID);
            }
        }, 1000);

    }
};

///////

btnStart.addEventListener('click', () => {
    timer.start();
  btnStart.setAttribute('disabled', 'disabled');
  inputEl.setAttribute('disabled', 'disabled');
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

///////

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


///////

function updateTimer({ days, hours, minutes, seconds }) {
  dayEl.textContent = days;
  hourEl.textContent = hours;
  minuteEl.textContent = minutes;
  secondEl.textContent = seconds;
}

