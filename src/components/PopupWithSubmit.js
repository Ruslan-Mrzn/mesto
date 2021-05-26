import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitCallback) { // селектор попапа
    super(popupSelector); // наследует от Popup
    this._handleSubmit = submitCallback;
    this._form = this._popup.querySelector('.form') // запомним форму внутри модалки
  }

  open = (cardID, deleteCard) => {
    console.log(cardID);
    // но и добавлять обработчик сабмита формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(cardID, deleteCard);
    });
    super.open();
  }

  close = () => {
    super.close(); // наследует от Popup
  }

}
