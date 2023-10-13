import Notiflix from 'notiflix';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const date = new Date();
const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]')
const inputDays = document.querySelector('[data-days]')
const inputHours = document.querySelector('[data-hours]')
const inputMinutes = document.querySelector('[data-minutes]')
const inputSeconds = document.querySelector('[data-seconds]')

console.log(inputDays)
console.log(inputHours)
console.log(inputMinutes)
console.log(inputSeconds)


Notiflix.Report.init({
    position: 'center-bottom',
    className: 'notiflix-report',
    width: '320px',
    backgroundColor: '#f8f8f8',
    borderRadius: '50px',
});
const options = {
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    theme: "dark",
    // minDate: "today",
    maxDate: new Date().fp_incr(22),
    disable: [
        function (date) {
            return (date.getDay() === 0 || date.getDay() === 6);
        }
    ],
    locale: {
        "firstDayOfWeek": 1 // start week on Monday
    },
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] < date) {
            Notiflix.Report.failure('ERROR', 'Please choose a date in the future', 'Close');
        }
        const objectDate = convertMs(selectedDates[0])
        console.log(objectDate.days - 1943);
        inputDays.textContent = `${objectDate.days - 1943}`
        inputHours.textContent = `${convertMs(selectedDates[0]).hours}`
        inputMinutes.textContent = `${convertMs(selectedDates[0]).minutes}`
        inputSeconds.textContent = `${convertMs(selectedDates[0]).seconds}`
    },
};

flatpickr(inputEl, options);




// function padStart({ days, hours, minutes, seconds }) {
//     const daysNum = days / 24;
//     const hoursNum = hours / 60;
//     const minutesNum = minutes / 60;
//     const secondsNum = seconds / 60;
//     return { daysNum, hoursNum, minutesNum, secondsNum }
// }

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


