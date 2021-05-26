// Создайте класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) { // принимает в конструктор селектор попапа
    super(popupSelector); // наследование из класса Popup
    this._title =  this._popup.querySelector('.image-popup__title');
    this._image = this._popup.querySelector('.image-popup__photo');
  }
  // по условию задачи:
  open = (objName, objLink) => { //этот класс должен перезаписывать родительский метод open

    // заполним пустую модалку данными:
    this._title.textContent = objName; // описание изображения
    this._image.src = objLink; // ссылка на изображение
    this._image.alt = objName; // alt изображения
    // наследование от родительского класса:
    super.open(); //метод, который отвечает за открытие модалки
  }


  close = () => {
    super.close(); // наследует от Popup
  }

}
