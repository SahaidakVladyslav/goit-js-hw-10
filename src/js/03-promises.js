const delayInputEl = document.querySelector('[name="delay"]');
const stepInputEl = document.querySelector('[name="step"]');
const amountInputEl = document.querySelector('[name="amount"]');
const submitBtnEl = document.querySelector('[type="submit"]');
const formEl = document.querySelector('.form');
let timerId = null;

function createPromise(position, delay) {
  // Возвращаем новый промис
  return new Promise((resolve, reject) => {
    // Устанавливаем интервал
    timerId = setInterval(() => {
      // Имитируем некоторую логику внутри промиса
      if (5 > 0) {
        // Если условие выполняется, разрешаем промис
        resolve('mambaSuccess');
      } else {
        // Иначе отклоняем промис
        reject('mambaError');
      }
    }, delay);
  });
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  // Используем созданную функцию для создания промиса
  createPromise(amountInputEl.value, delayInputEl.value)
    .then((result) => {
      console.log('Promise resolved:', result);
    })
    .catch((error) => {
      console.log('Promise rejected:', error);
    })
    .finally(() => {
      // Очищаем форму после завершения промиса
      formEl.reset();
    });
});