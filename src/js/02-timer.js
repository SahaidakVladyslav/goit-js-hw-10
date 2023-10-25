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
let timeUpdateTime = null;

const todayDate = new Date()
console.log()
const btnNone = () => {
    btnStart.style.opacity = 0.5;
    btnStart.style.pointerEvents = 'none';
}
const btnAuto = () => {
    btnStart.style.pointerEvents = 'auto';
    btnStart.style.opacity = 1;
}
const inputTextContentValue = (dateFormat) => {
    inputDays.textContent = `${parseFloat((dateFormat.days).toFixed(1)) - 19655}`
    inputHours.textContent = `${parseFloat((dateFormat.hours).toFixed(1)) - 17}`
    inputMinutes.textContent = `${parseFloat((dateFormat.minutes).toFixed(1)) - todayDate.getMinutes()}`
    inputSeconds.textContent = `${parseFloat((dateFormat.seconds).toFixed(1))}`
}
const emptyTextContent = () => {
    inputDays.textContent = `0`
    inputHours.textContent = `0`
    inputMinutes.textContent = `0`
    inputSeconds.textContent = `0`
}
function ifShuldTimerStart() {
    if (+inputSeconds.textContent >= 0) {
        if (+inputMinutes.textContent >= 0) {
            if (+inputHours.textContent >= 0) {
                if (+inputDays.textContent >= 0) {
                    return btnAuto()
                }
            }
        }
    }


}
function padStart() {
    let totalSeconds = +inputDays.textContent * 24 * 60 * 60 +
        +inputHours.textContent * 60 * 60 +
        +inputMinutes.textContent * 60 +
        +inputSeconds.textContent;

    totalSeconds -= 1;

    if (totalSeconds < 0) {
        emptyTextContent();
        clearInterval(timeUpdateTime);
    } else {
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        inputDays.textContent = days;
        inputHours.textContent = hours;
        inputMinutes.textContent = minutes;
        inputSeconds.textContent = seconds;
    }
}

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

btnNone()



Notiflix.Report.init({
    width: '280px',
    position: 'right-top', // не можу ніяк зрозумічит чому воно не працює
    distance: '10px',
    borderRadius: '50px',
    backOverlayColor: 'rgba(1,2,3,4.9)',
    svgSize: '80px',
    backgroundColor: '#83f1ea',
});
const options = {
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    theme: "dark", // не можу ніяк зрозумічит чому воно не працює
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    maxDate: new Date().fp_incr(22),
    disable: [
        function (date) {
            return (date.getDay() === 0 || date.getDay() === 6);
        }
    ],
    locale: {
        "firstDayOfWeek": 1
    },
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        clearInterval(timeUpdateTime);
        if (selectedDates[0].getTime() <= todayDate.getTime()) {
            Notiflix.Report.failure('ERROR', 'Please choose a date in the future', 'Close');
            emptyTextContent()
            return btnNone()
        }

        const objectDate = convertMs(selectedDates[0])
        inputTextContentValue(objectDate)
        ifShuldTimerStart()

    },
};
flatpickr(inputEl, options);


btnStart.addEventListener('click', () => {
    timeUpdateTime = setInterval(padStart, 1000);
    btnNone()
})

