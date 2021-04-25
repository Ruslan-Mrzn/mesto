const settings = {
  //formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__error_visible',
}


// function enableValidation (settings) { //принимает объект с настройками
//   const forms = Array.from(document.querySelectorAll(settings.formSelector)); //найдем все формы
//   forms.forEach(form => { //для каждой формы
//     console.log(form)
//     form.addEventListener('submit', evt => { //отменим отправку формы
//       evt.preventDefault();
//     });
//     setEventListeners(form, settings); // вызовем большую цепочку действий
//   })
// }

// function setEventListeners(form, settings) { // выполним последовательность действий:
//   const inputs = Array.from(form.querySelectorAll(settings.inputSelector)); // найдем все инпуты в форме
//   const formSubmitButton = form.querySelector(settings.submitButtonSelector); // найдем кнопку сабмита формы
//   // проверим состояние инпутов до изменения и зададим состояние кнопки сабмита
//   changeButtonState(inputs, formSubmitButton, settings);

//   inputs.forEach(input => { // для каждого инпута в форме
//     input.addEventListener('input', () => { // при каждом изменении значения
//       checkInputValidity(form, input, input.validationMessage, settings); // проверим валидность инпута
//       changeButtonState(inputs, formSubmitButton, settings); // проверим нужно ли менять сосотяние кнопки сабмита
//     })
//   })
// }

// // функция-колбэк на событие изменения инпута в форме
// function checkInputValidity (form, input, errorMessage, settings) {
//   if (input.validity.valid) { // если инпут валидный
//     hideError(form, input, settings); //скрой ошибки
//   } else { //если не валидыный
//       showError(form, input, errorMessage, settings); // покажи ошибки
//     }
// }

// // показать текст-ошибку и красную линию
// function showError (form, input, errorMessage, settings) {
//   const errorElement = form.querySelector(`.${input.name}-error`); //поиск класса по шаблону уникальных имен инпутов
//   input.classList.add(settings.inputErrorClass); // инпуту добавим красную полоску невалидности
//   errorElement.textContent = errorMessage; // зададим стандартную браузерную текст-ошибку инпута для его спана
//   errorElement.classList.add(settings.errorClass); // и покажем этот инпут
// }

// // скрыть текст-ошибку и красную линию
// function hideError (form, input, settings) {
//   const errorElement = form.querySelector(`.${input.name}-error`);
//   input.classList.remove(settings.inputErrorClass);
//   errorElement.textContent = ''; // очистим спан
//   errorElement.classList.remove(settings.errorClass);
// }


// // есть ли хоть один невалидный инпут внутри текущей формы??, возвращает Boolean да/нет
// function hasInvalidInput (inputs) { //принимает массив инпутов внутри текущей формы
//   return inputs.some(input => { // если хоть один инпут
//     return !input.validity.valid; // возвращает НЕ-валидный/невалидный(типа ответ на вопрос названия функции:))
//   });
// }

// // меняем состояние кнопки сабмита в зависимости от валидности полей формы
// function changeButtonState (inputs, formSubmitButton, settings) {
//   if (hasInvalidInput(inputs)) { // если есть невалидный инпут внутри текущей формы
//     formSubmitButton.setAttribute('disabled', ''); // добавим атрибут на кнопку нельзя "нажать"
//     formSubmitButton.classList.add(settings.inactiveButtonClass); // изменим внешний вид типа недоступна
//   } else { //если в форме все инпуты были/стали валидны
//       formSubmitButton.removeAttribute('disabled'); // удалим атрибут, снова можно "нажимать" на кнопку
//       formSubmitButton.classList.remove(settings.inactiveButtonClass); // изменим внешний вид типа доступна
//     }
// }

// // функция проверки валидности формы при открытии, до внесения изменений:
// function checkFormValidity (form, settings) {
//   const inputs = Array.from(form.querySelectorAll(settings.inputSelector)); // найдем все инпуты в форме
//   const formSubmitButton = form.querySelector(settings.submitButtonSelector); // найдем кнопку сабмита формы

//   inputs.forEach(input => { // для каждого инпута в форме
//     if (input.value !== '') { // если он не пустой
//       checkInputValidity(form, input, input.validationMessage, settings); // проверим валидность инпута
//     } else {
//       hideError (form, input, settings);
//     }
//     changeButtonState(inputs, formSubmitButton, settings); // проверим нужно ли менять состяние кнопки сабмита
//   })
// }

// enableValidation(settings); // запустим валидацию
