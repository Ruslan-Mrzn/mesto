// Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
// Принимать в конструктор ссылки на изображение и текст;

// Принимать в конструктор селектор для template-элемента с шаблоном разметки;

// Обладать приватными методами, которые установят слушателей событий, обработают клики, подготовят карточку к публикации;

// Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями событий.

export default class Card {
  //конструктор принимает объект, селектор template-элемента и функцию открытия модалки изображения
  constructor ({ name, link , likes, owner, _id }, templateSelector, handleCardClick, handleDeleteButtonClick, user, toggleLike) {
    // сделаем свойства объекта приватными свойствами текущего объекта (this):
    this._link = link; // ссылка на изображение
    this._name = name; // заголовок-текст
    this._likes = likes; // массив пользователей, лайкнувших карточку
    console.log(this._likes);
    this._owner = owner; // объект с данными пользователя, который добавил карточку
    this._user = user; // объект с данными пользователя
    this._id = _id; // id карточки
    // селектор для template-элемента с шаблоном разметки:
    this.templateSelector = templateSelector; // пока оставлю так, по условию задачи должен быть в конструкторе
    this._openImagePopup = handleCardClick; // вынесли эту функцию в index.js и передали в консруктор
    this._openActSubmitPopup = handleDeleteButtonClick; // вынесли эту функцию в index.js и передали в консруктор
    this._toggleLike = toggleLike; // вынесли эту функцию в index.js и передали в консруктор
  }

  createPhotoCard() { // публичный метод интерфейса для создания карточки
    this._element = this._getCardTemplate(); // пока возьму пустой шаблон аналогично как в тренажере
    // запомним элементы в поле класса:
    this._elementTitle = this._element.querySelector('.photo-card__title'); //заголовок карточки
    this._elementImage = this._element.querySelector('.photo-card__img'); // изображение карточки
    this._elementLikeButton = this._element.querySelector('.photo-card__like-button'); // кнопка лайк
    this._elementDeleteButton = this._element.querySelector('.photo-gallery__delete-item-button'); //кнопка удалить
    this._elementLikesQuantity = this._element.querySelector('.photo-card__likes-counter'); //счетчик лайков
    // далее заполняем шаблон данными:
    this._elementTitle.textContent = this._name; // зададим заголовок карточки
    this._elementImage.src = this._link; // ссылку на изображение
    this._elementImage.alt = this._name; // alt изображения
    this._elementLikesQuantity.textContent = this._likes.length // длина массива (количество лайкнувших людей)
    if(this._owner._id === this._user._id) {
      this._elementDeleteButton.classList.add('photo-gallery__delete-item-button_available');
      console.log(`${this._name} id: ${this._id}`);
    }

    if(this._likes.includes(this._user)) {
      console.log('я тоже лайкнул');
      this._elementLikeButton.classList.add('photo-card__like-button_type_active');
    }

    // устанавливаем слушатели:
    this._setEventListeners();

    // вернем заполненный шаблон:
    return this._element;
  }

  // // публичный метод получения id
  // _getCardID = () => { // в дальнейшем передается для удаления карточки
  //   console.log(this._id);
  //   return this._id;
  // }

  _deleteCard = () => { // публичный метод удаления карточки
    this._element.remove();
    this._element = null;
  }

  _getCardTemplate() { //найдем и вернем в приватном методе класса пустой шаблон фото-карточки:
    const photoCard = document
      .querySelector(this.templateSelector) //используем селектор для template-элемента с шаблоном разметки
      .content
      .querySelector('.photo-gallery__item') //элемент списка карточек
      .cloneNode(true); //глубокое копирвание

    return photoCard;
  }

  _setEventListeners() { // приватный метод установки слушателей (аналогично тренажеру):
    this._elementImage.addEventListener('click', () => { // при клике на изображение
      this._openImagePopup(this._name, this._link); //открывает модалку
    });
    // при клике на кнопку лайка - переключается класс:
    this._elementLikeButton.addEventListener('click', (evt) => {
      this._toggleLike(evt, this._id, this._elementLikesQuantity);
    });
    // при клике на кнопку удалить - карточка удаляется:
    this._elementDeleteButton.addEventListener('click', () => {
      this._openActSubmitPopup(this._id, this._deleteCard);
    });
    //
  }

  // _toggleLike = (evt) => { // приватный метод лайка
  //   if (evt.target.classList.contains('photo-card__like-button')) { // если в цели кнопка лайка
  //     evt.target.classList.toggle('photo-card__like-button_type_active');// тогда переключаем класс
  //   }
  // }
}
