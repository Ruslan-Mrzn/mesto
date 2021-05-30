import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitCallback) { // селектор попапа
    super(popupSelector); // наследует от Popup
    this._handleSubmit = submitCallback; // передается из index.js
    this._form = this._popup.querySelector('.form') // запомним форму внутри модалки
    this._submitButton = this._form.querySelector('.form__submit-button'); // запомним кнопку сабмита формы
  }

  // приватный метод для привязки
  _deleteCard(cardID, deleteCard, evt) { // прокинем id карточки и функцию удаления из класса Card
    evt.preventDefault();
    this._handleSubmit(cardID, deleteCard);
  }

  open = (cardID, deleteCard) => {
    this._form.removeEventListener('submit', this._currentHandler) //при открытии удалим слушатель на сабмите (уберет ошибки при удалении нескольких карточек)
    this._currentHandler = this._deleteCard.bind(this, cardID, deleteCard) // привяжем аргументы текущей карточки
    this._form.addEventListener('submit', this._currentHandler); // добавим слушатель на удаление по сабмиту
    super.open(); // покажем модалку
  }

  // метод улучшения UX формы:
  renderLoading(status, loadingText) { //принимает 1.true или false 2. строка надписи в кнопке
    if(status) {
      this._submitButton.textContent = loadingText; // меняем текст при запросе API
    } else {
      if (!status) {
        this._submitButton.textContent = this._submitButton.value; // для универсальности метода забираем значение из html-файла
      }
    }
  }
}
