// Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
// Принимать в конструктор ссылки на изображение и текст;

// Принимать в конструктор селектор для template-элемента с шаблоном разметки;

// Обладать приватными методами, которые установят слушателей событий, обработают клики, подготовят карточку к публикации;

// Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями событий.

export class Card {

  constructor (data, templateSelector) { //конструктор принимает объект и селектор template-элемента
    // сделаем свойства объекта приватными свойствами текущего объекта (this):
    this._link = data.link; // ссылка на изображение
    this._name = data.name; // заголовок-текст
    // селектор для template-элемента с шаблоном разметки:
    this.templateSelector = templateSelector; // пока оставлю так, по условию задачи должен быть в конструкторе

    // определим общий попап для карточек:
    this.popup = document.querySelector('.popup_type_image');
  }

  createPhotoCard () { // публичный метод интерфейса для создания карточки
    this._element = this._getCardTemplate(); // пока возьму пустой шаблон аналогично как в тренажере

    // далее заполняем шаблон данными:
    this._element.querySelector('.photo-card__title').textContent = this._name; // зададим заголовок карточки
    this._element.querySelector('.photo-card__img').src = this._link; // ссылку на изображение
    this._element.querySelector('.photo-card__img').alt = this._name; // alt изображения
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
    this._element.querySelector('.photo-card__img').addEventListener('click', () => { //при клике на изображение
      // заполним пустую модалку данными:
      this.popup.querySelector('.image-popup__title').textContent = this._name; // описание изображения
      this.popup.querySelector('.image-popup__photo').src = this._link; // ссылка на изображение
      this.popup.querySelector('.image-popup__photo').alt = this._name; // alt изображения
      // затем открыть модалку, добавив класс:
      this.popup.classList.add('popup_opened');
      // добавим закрытие модалки по нажатию на Escape:
      document.addEventListener('keydown', this._closeByEscape);
    });
    // при клике на кнопку лайка - переключается класс:
    this._element.querySelector('.photo-card__like-button').addEventListener('click', this._toggleLike);
    // при клике на кнопку удалить - карточка удаляется:
    this._element.querySelector('.photo-gallery__delete-item-button').addEventListener('click', this._deleteCard);
  }
  // чтобы избежать потери контекста используем стрелочную функцию:
  _closeByEscape = (evt) => {
    if (evt.key === 'Escape') { // если это кнопка = Escape
      this.popup.classList.remove('popup_opened'); // закроем модалку
      document.removeEventListener('keydown', this._closeByEscape); // удалим слушатель на кнопке Escape
    }
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
