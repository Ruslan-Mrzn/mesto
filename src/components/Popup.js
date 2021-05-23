// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.

export default class Popup {
  constructor(popupSelector) { // принимает в конструктор селектор попапа
    this._popup = document.querySelector(popupSelector); // запомним его в конструкторе
  }

  // по условию задачи класс содержит:
  open() { // 1.публичный метод, который отвечает за открытие модалки
    this._popup.classList.add('popup_opened'); // добавим модалке класс для отображения
    document.addEventListener('keydown', this._handleEscClose); // добавим слушатель нажатия кнопки Escape
  }

  close = () => { // 2.публичный метод, который отвечает за закрытие модалки
    this._popup.classList.remove('popup_opened'); // удаляем класс для закрытия модалки
    document.removeEventListener('keydown', this._handleEscClose); // удалим слушатель нажатия кнопки Escape
  }

  _handleEscClose = (evt) => { // 3.приватный метод, который содержит логику закрытия попапа клавишей Esc
    if (evt.key === 'Escape') { // если это кнопка = Escape
      this.close(); // тогда закроем модалку
    }
  }

  setEventListeners() { // 4.публичный метод, который:
    // добавляет слушатель клика иконке закрытия попапа
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close);
    // добавляет слушатель клика на модалке
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup_opened')) { // если кликнули на модалку (не форму!!)
        this.close(); //тогда закроем модалку
      }
    })
  }
}
