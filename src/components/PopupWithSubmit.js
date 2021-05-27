import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitCallback) { // селектор попапа
    super(popupSelector); // наследует от Popup
    this._handleSubmit = submitCallback;
    this._form = this._popup.querySelector('.form') // запомним форму внутри модалки
  }

  // приватный метод для привязки
  _deleteCard(cardID, deleteCard, evt) { // прокинем id карточки и функцию удаления из класса Card
    evt.preventDefault();
    this._handleSubmit(cardID, deleteCard);
  }
  open = (cardID, deleteCard) => {
    console.log(cardID);
    this._form.removeEventListener('submit', this._currentHandler) //при открытии удалим слушатель на сабмите (уберет ошибки при удалении нескольких карточек)
    this._currentHandler = this._deleteCard.bind(this, cardID, deleteCard) // привяжем аргументы текущей карточки
    this._form.addEventListener('submit', this._currentHandler); // добавим слушатель на удаление по сабмиту
    super.open(); // покажем модалку
  }

  close = () => {
    super.close(); // наследует от Popup
  }
}
