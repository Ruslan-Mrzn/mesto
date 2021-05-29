// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) { // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    super(popupSelector); // наследует от Popup
    this._handleSubmit = submitCallback; // колбэк сабмита
    this.form = this._popup.querySelector('.form') // запомним форму внутри модалки
    this._inputs = Array.from(this.form.querySelectorAll('.form__text-input')); //запомним массив инпутов формы
    this._submitButton = this.form.querySelector('.form__submit-button'); // запомним кнопку сабмита формы
  }

  // по условию задачи:
  _getInputValues = () => { // Содержит приватный метод
    const inputValues = {}; // создадим пустой объект
    this._inputs.forEach(input => { // для каждого инпута
      inputValues[input.name] = input.value; // создадим в объекте ключ и значение
    });
    return inputValues // вернем заполненный объект (собрали данные всех полей формы)
  }

  // Перезаписывает родительский метод close
  close = () => {
    super.close(); // наследует от Popup
    // при закрытии попапа форма должна ещё и сбрасываться
    this.form.reset();
  }


  // Перезаписывает родительский метод setEventListeners
  setEventListeners() {
    // должен не только добавлять обработчик клика иконке закрытия
    super.setEventListeners();
    // но и добавлять обработчик сабмита формы
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  // метод для записи в инпуты значений при открытии модалки профиля:
  setInputValues(data) { // принимает объект (сюда будет передавать метод из класса UserInfo)
    this._inputs.forEach(input => { // для каждого инпута
      if (data.hasOwnProperty(input.name)) { // если в объекте есть свойство с именем инпута
        input.value = data[input.name] // задать в инпут значение свойства объекта
      }
    })
  }

  // метод улучшения UX формы:
  renderLoading(status) { //принимает true или false
    if(status) {
      this._submitButton.textContent = 'Сохраняю...'; // меняем текст при запросе API
    } else {
      if (!status) {
        this._submitButton.textContent = this._submitButton.value; // для универсальности метода забираем значение из html-файла
      }
    }
  }
}
