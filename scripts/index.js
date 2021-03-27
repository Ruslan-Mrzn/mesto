// временно возьмем начальный массив фотографий из 5-й работы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// находим элемент фотогалереи из тэга template
const photoCardTemplate = document.querySelector('.template-photo-card').content.querySelector('.photo-gallery__item');
console.log(photoCardTemplate);

// находим пустую галерею фотографий
const photoGallery = document.querySelector('.photo-gallery__list');

/* для каждого элемента начального массива фотографий initialCards
* отрисуем фотографию в пустом на данный момент
* блоке photo-gallery__list
*/
initialCards.forEach(function(initialCard) {
  // клонируем элемент фотогалереи для каждой фото-карточки
  const photoGalleryItem = photoCardTemplate.cloneNode(true);

  /** присваиваем элементам фото-карточки необходимые значения
    * из соответствующих значений ключей объектов
    * массива начальных фотографий initialCards
  */
  photoGalleryItem.querySelector('.photo-card__title').textContent = initialCard.name;
  photoGalleryItem.querySelector('.photo-card__img').src = initialCard.link;

  // отрисовка каждой фото-карточки в конце фотогалереи
  photoGallery.append(photoGalleryItem);
});

//находим popup с формой
const popup = document.querySelector('.popup');

// находим форму в popup
const form = popup.querySelector('.edit-form')

// находим инпут с именем
const nameInput = form.querySelector('[name=profile-name]');

// находим инпут с описанием
const descriptionInput = form.querySelector('[name=profile-description]');

// находим кнопку редактировать профиль, она же открывает popup форму
const openPopupButton = document.querySelector('.profile__edit-button');

// находим имя профиля
const profileName = document.querySelector('.profile__name');

// находим описание профиля
const profileDescription = document.querySelector('.profile__description');

// находим кнопку закрыть popup с формой
const closePopupButton = popup.querySelector('.popup__close-button');

// метод открытия popup-а путем добавления класса
const openPopup = function () {
  // так же совместим открытие попапа с добавлением информации в input-ы формы
  // для улучшения читабельности кода изменили setAttribute на свойство value
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // перенести открытие popup в конец функции, чтобы показать конечный результат
  popup.classList.add('popup_opened');
}

// метод закрытия popup-а путем удаления класса
const closePopup = function () {
  popup.classList.remove('popup_opened');
  // удалили из функции "лишний" код, т.к. при закрытии данные никуда копироваться не должны
}

// метод для сохранения введенной информации в форме (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы
const saveChanges = function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}

// слушатель на кнопке редактировать профиль
openPopupButton.addEventListener('click', openPopup);

// слушатель на кнопке закрыть попап
closePopupButton.addEventListener('click', closePopup);

// слушатель на форме с отменой отправки формы
form.addEventListener('submit', saveChanges);
