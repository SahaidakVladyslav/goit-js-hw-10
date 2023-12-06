import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';


const delayInputEl = document.querySelector('[name="delay"]');
const stepInputEl = document.querySelector('[name="step"]');
const amountInputEl = document.querySelector('[name="amount"]');
const formEl = document.querySelector('.form');
const shouldResolve = Math.random() > 0.3;
let timerId = null;
let count = 0;
let timeDelay = 0;
let counterAmount = 0;
function createPromise(position, initialDelay, subsequentDelay) {
    return new Promise((resolve, reject) => {
        timeDelay = initialDelay;
        counterAmount = 1


        function finallyDesition() {
            if (count !== 0) {
                timerId = setInterval(() => {
                    const shouldResolve = Math.random() > 0.3;

                    counterAmount += 1
                    timeDelay = +timeDelay + +subsequentDelay;
                    if (shouldResolve) {
                        Notiflix.Notify.failure(
                            `❌ Rejected promise ${counterAmount} in ${timeDelay}ms`
                        );
                        console.log(`виклик зробився за такий час ${timeDelay}`)
                    } else {
                        Notiflix.Notify.success(
                            `✅ Fulfilled promise ${counterAmount} in ${timeDelay}ms`
                        );
                        console.log(`виклик зробився за такий час ${timeDelay}`)
                    }
                    count += 1;
                    if (count >= position) {
                        count = 0;
                        clearInterval(timerId);
                    }
                }, subsequentDelay)
            }
        }


        function intervalFunction() {
            if (count === 0) {
                setTimeout(() => {
                    const shouldResolve = Math.random() > 0.3;

                    count += 1;
                    if (shouldResolve) {
                        Notiflix.Notify.success(
                            `✅ Fulfilled promise ${counterAmount} in ${initialDelay}ms`
                        );
                        console.log(`виклик зробився за такий час ${initialDelay}`)
                        finallyDesition()
                        resolve('Kurwo! To praca!');
                    } else {
                        Notiflix.Notify.failure(
                            `❌ Rejected promise ${counterAmount} in ${initialDelay}ms`
                        );
                        console.log(`виклик зробився за такий час ${initialDelay}`)
                        finallyDesition()
                        reject('Kurwo! To NE praca!');
                    }
                }, initialDelay)
            }
        }
        intervalFunction()
    });
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    formEl.reset();
    const amountStep = amountInputEl.value;
    const initialDelay = delayInputEl.value;
    const subsequentDelay = stepInputEl.value;

    createPromise(amountStep, initialDelay, subsequentDelay)
        .then((result) => {
            console.log('Promise resolved:', result);
        })
        .catch((error) => {
            console.log('Promise rejected:', error);
        })
});