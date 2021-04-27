// Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
// Принимать в конструктор ссылки на изображение и текст;

// Принимать в конструктор селектор для template-элемента с шаблоном разметки;

// Обладать приватными методами, которые установят слушателей событий, обработают клики, подготовят карточку к публикации;

// Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями событий.

export class Card {
  //конструктор принимает объект, селектор template-элемента и функцию открытия модалки изображения
  constructor (data, templateSelector, openImagePopup) {
    // сделаем свойства объекта приватными свойствами текущего объекта (this):
    this._link = data.link; // ссылка на изображение
    this._name = data.name; // заголовок-текст
    // селектор для template-элемента с шаблоном разметки:
    this.templateSelector = templateSelector; // пока оставлю так, по условию задачи должен быть в конструкторе
    this._openImagePopup = openImagePopup; // вынесли эту функцию в index.js и передали в консруктор
  }

  createPhotoCard () { // публичный метод интерфейса для создания карточки
    this._element = this._getCardTemplate(); // пока возьму пустой шаблон аналогично как в тренажере
    // запомним элементы в поле класса:
    this._elementTitle = this._element.querySelector('.photo-card__title'); //заголовок карточки
    this._elementImage = this._element.querySelector('.photo-card__img'); // изображение карточки
    this._elementLikeButton = this._element.querySelector('.photo-card__like-button'); // кнопка лайк
    this._elementDeleteButton = this._element.querySelector('.photo-gallery__delete-item-button'); //кнопка удалить
    // далее заполняем шаблон данными:
    this._elementTitle.textContent = this._name; // зададим заголовок карточки
    this._elementImage.src = this._link; // ссылку на изображение
    this._elementImage.alt = this._name; // alt изображения
    // устанавливаем слушатели:
    this._setEventListeners();
    // вернем заполненный шаблон:
    return this._element;
  }

  _getCardTemplate () { //найдем и вернем в приватном методе класса пустой шаблон фото-карточки:
    const photoCard = document
      .querySelector(this.templateSelector) //используем селектор для template-элемента с шаблоном разметки
      .content
      .querySelector('.photo-gallery__item') //элемент списка карточек
      .cloneNode(true); //глубокое копирвание

    return photoCard;
  }

  _setEventListeners () { // приватный метод установки слушателей (аналогично тренажеру):
    this._elementImage.addEventListener('click', () => { // при клике на изображение
      this._openImagePopup(this._name, this._link); //открывает модалку
    });
    // при клике на кнопку лайка - переключается класс:
    this._elementLikeButton.addEventListener('click', this._toggleLike);
    // при клике на кнопку удалить - карточка удаляется:
    this._elementDeleteButton.addEventListener('click', this._deleteCard);
  }

  _toggleLike(evt) { // приватный метод лайка
    if (evt.target.classList.contains('photo-card__like-button')) { // если в цели кнопка лайка
      evt.target.classList.toggle('photo-card__like-button_type_active');// тогда переключаем класс
    }
  }

  _deleteCard(evt) { // приватный метод удаления карточки
    if (evt.target.classList.contains('photo-gallery__delete-item-button')) { // если кликаем по кнопке удалить
      evt.target.closest('.photo-gallery__item').remove();// удаляем карточку
    }
  }
}
