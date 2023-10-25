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

const todayDate = new Date()

let timeUpdateTime = null;

btnStart.style.pointerEvents = 'none';
btnStart.style.opacity = 0.5;




function padStart() {
    if (+inputSeconds.textContent >= 0) {
        inputSeconds.textContent = +inputSeconds.textContent - 1;

    }
    if (+inputSeconds.textContent === -1) {
        inputSeconds.textContent = 60;
    }

    if (+inputSeconds.textContent === 0) {
        inputMinutes.textContent = +inputMinutes.textContent - 1;

    }
    if (+inputMinutes.textContent === -1) {
        inputHours.textContent -= 1;
        inputMinutes.textContent = 60;
    }

    if (+inputHours.textContent === 0) {
        inputHours.textContent = +inputHours.textContent - 1;
        if (+inputHours.textContent === -1) {
            inputDays.textContent -= 1;
            inputHours.textContent = 24;
            if (+inputDays.textContent === -1) {
                inputSeconds.textContent = 0;
                inputMinutes.textContent = 0;
                inputHours.textContent = 0;
                inputDays.textContent = 0;
                clearInterval(timeUpdateTime);
            }
        }
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
            btnStart.style.opacity = 0.5;
            return btnStart.style.pointerEvents = 'none';
        }
        const objectDate = convertMs(selectedDates[0])
        inputDays.textContent = `${parseFloat((objectDate.days).toFixed(1)) - 19653}`
        inputHours.textContent = `${parseFloat((objectDate.hours).toFixed(1))}`
        inputMinutes.textContent = `${parseFloat((objectDate.minutes).toFixed(1))}`
        inputSeconds.textContent = `${parseFloat((objectDate.seconds).toFixed(1))}`
        if (+inputDays.textContent >= 1) {
            btnStart.style.pointerEvents = 'auto';
            btnStart.style.opacity = 1;
        }

    },
};
flatpickr(inputEl, options);


btnStart.addEventListener('click', () => {
    timeUpdateTime = setInterval(padStart, 1000);
    btnStart.style.pointerEvents = 'none';
    btnStart.style.opacity = 0.5;
})

