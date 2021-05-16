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

  // не уверен, что это верно, но оставлю пока что:
  // метод для записи в инпуты значений при открытии модалки профиля
  setInputValues({profileName, profileDescription}) { // принимает объект (сюда будет передавать метод из класса UserInfo)
    const nameInput = this.form.querySelector('[name=name]'); // инпут для имени профиля
    const descriptionInput = this.form.querySelector('[name=description]'); // инпут для описания профиля
    nameInput.value = profileName;
    descriptionInput.value = profileDescription;
  }

  setInputValuesReview(data) { // принимает объект (сюда будет передавать метод из класса UserInfo)
    console.log(data)
    this._inputs.forEach(input => { // для каждого инпута
      if (data.hasOwnProperty(input.name)) { // если в объекте есть свойство с именем инпута
        input.value = data[input.name] // задать в инпут значение свойства объекта
      }
    })
  }

}
