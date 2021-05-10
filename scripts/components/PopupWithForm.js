// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners.
  // Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm

import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) { // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    super(popupSelector); // наследует от Popup
    this._handleSubmit = submitCallback; // колбэк сабмита
    this._form = this._popup.querySelector('.form') // запомним форму внутри модалки
    this._inputs = Array.from(this._form.querySelectorAll('.form__text-input')); //запомним массив инпутов формы
  }

  // по условию задачи:
  _getInputValues() { // Содержит приватный метод
    const inputValues = {}; // создадим пустой объект
    this._inputs.forEach(input => { // для каждого инпута
      inputValues.input = input.value; // создадим в объекте ключ и значение
    });
    return inputValues // вернем заполненный объект (собрали данные всех полей формы)
  }

  // Перезаписывает родительский метод setEventListeners
  setEventListeners() {
    // должен не только добавлять обработчик клика иконке закрытия
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this._popup.close() // закрыть модалку
    })
    // но и добавлять обработчик сабмита формы
    this._popup.querySelector('.form__submit-button').addEventListener('submit', this._handleSubmit);
  }

  // Перезаписывает родительский метод close
  close() {
    this._popup.classList.remove('popup_opened'); // удаляем класс для закрытия модалки
    document.removeEventListener('keydown', this._handleEscClose); // удалим слушатель нажатия кнопки Escape
    // при закрытии попапа форма должна ещё и сбрасываться
    this._form.reset();
  }
}
