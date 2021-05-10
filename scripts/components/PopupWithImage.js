// Создайте класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.

import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) { // принимает в конструктор селектор попапа
    super(popupSelector); // наследование из класса Popup
  }
  // по условию задачи:
  open(objName, objLink) { //этот класс должен перезаписывать родительский метод open
    // заполним пустую модалку данными:
    this._popup.querySelector('.image-popup__title').textContent = objName; // описание изображения
    this._popup.querySelector('.image-popup__photo').src = objLink; // ссылка на изображение
    this._popup.querySelector('.image-popup__photo').alt = objName; // alt изображения
    // повторение из родительского класса:
    this._popup.classList.add('popup_opened'); // добавим модалке класс для отображения
    document.addEventListener('keydown', this._handleEscClose); // добавим слушатель нажатия кнопки Escape
  }
}