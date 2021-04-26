// Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
// Принимать в конструктор ссылки на изображение и текст;

// Принимать в конструктор селектор для template-элемента с шаблоном разметки;

// Обладать приватными методами, которые установят слушателей событий, обработают клики, подготовят карточку к публикации;

// Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями событий.

export class Card {

  constructor (data, templateSelector) { //конструктор принимает объект
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
    this._element.querySelector('.photo-card__img').src = this._link; // ссылка на изображение
    this._element.querySelector('.photo-card__img').alt = this._name; // alt у изображения
    // устанавливаем слушатели:
    this._setEventListeners();
    // вернем заполненный шаблон:
    return this._element;
  }

  _getCardTemplate () { //найдем и вернем в приватном методе класса пустой шаблон фото-карточки:
    const photoCard = document
      .querySelector(this.templateSelector) //используем общее св-во (селектор для template-элемента с шаблоном разметки)
      .content
      .querySelector('.photo-gallery__item')
      .cloneNode(true);

    return photoCard;
  }

  _setEventListeners () { // приватный метод установки слушателей (аналогично тренажеру):
    this._element.querySelector('.photo-card__img').addEventListener('click', () => {
      // заполним пустую модалку данными:
      this.popup.querySelector('.image-popup__title').textContent = this._name;
      this.popup.querySelector('.image-popup__photo').src = this._link;
      this.popup.querySelector('.image-popup__photo').alt = this._name;
      // затем открыть модалку, добавив класс:
      this.popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._closeByEscape);
      console.log('добавили Escape');
    });

    this._element.querySelector('.photo-card__like-button').addEventListener('click', (evt) => { //клик на кнопку like
      this._toggleLike(evt); // переключает лайки
    });

    this._element.querySelector('.photo-gallery__delete-item-button').addEventListener('click', (evt) => { //клик на кнопку delete
      this._deleteCard(evt); // удаляет карточку
    });
  }

  _closeByEscape = (evt) => {
    const popup = document.querySelector('.popup_opened'); // найдем открытый попап
    if (evt.key === 'Escape') { // если это кнопка = Escape
      popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._closeByEscape);
      console.log('удалил Escape');
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

