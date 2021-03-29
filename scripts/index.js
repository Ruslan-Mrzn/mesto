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

/* О Т Р И С О В К А   Н А Ч А Л Ь Н Ы Х   К А Р Т О Ч Е К */

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

  // добавление каждой фото-карточки в конце фотогалереи
  photoGallery.append(photoGalleryItem);
});

/* --------------------------------------------------------------- */


/* Р Е Д А К Т И Р О В А Н И Е   П Р О Ф И Л Я */

//находим popup с формой редактирования профиля
const EditPopup = document.querySelector('.popup_type_edit');

// находим форму редактирования в popup
const EditForm = EditPopup.querySelector('.form')

// находим инпут с именем
const nameInput = EditForm.querySelector('[name=profile-name]');

// находим инпут с описанием
const descriptionInput = EditForm.querySelector('[name=profile-description]');

// находим кнопку редактировать профиль, она же открывает popup форму
const EditFormButtonHandler = document.querySelector('.profile__edit-button');

// находим имя профиля
const profileName = document.querySelector('.profile__name');

// находим описание профиля
const profileDescription = document.querySelector('.profile__description');

// находим кнопку закрыть popup с формой редактирования профиля
const closeEditPopupButton = EditPopup.querySelector('.popup__close-button');

// метод открытия popup-а редактирования профиля путем добавления класса
const openEditPopup = function () {
  // так же совместим открытие попапа с добавлением информации в input-ы формы
  // для улучшения читабельности кода изменили setAttribute на свойство value
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // перенести открытие popup в конец функции, чтобы показать конечный результат
  EditPopup.classList.add('popup_opened');
}

// метод закрытия popup-а редактирования профиля путем удаления класса
const closeEditPopup = function () {
  EditPopup.classList.remove('popup_opened');
  // удалили из функции "лишний" код, т.к. при закрытии данные никуда копироваться не должны
}

// метод для сохранения введенной информации в форме (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы
const saveProfileChanges = function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeEditPopup();
}

// слушатель на кнопке редактировать профиль
EditFormButtonHandler.addEventListener('click', openEditPopup);

// слушатель на кнопке закрыть попап
closeEditPopupButton.addEventListener('click', closeEditPopup);

// слушатель на форме с отменой отправки формы
EditForm.addEventListener('submit', saveProfileChanges);

/* --------------------------------------------------------------- */


/* Д О Б А В Л Е Н И Е   Н О В О Й   К А Р Т О Ч К И   П О Л Ь З О В А Т Е Л Е М */

//находим popup с формой добвления новой карточки
const NewPhotoPopup = document.querySelector('.popup_type_add');

// находим форму в popup
const NewPhotoForm = NewPhotoPopup.querySelector('.form');

// находим инпут с названием фото
const titleInput = NewPhotoForm.querySelector('[name=photo-title]');

// находим инпут с ссылкой на изображение
const urlInput = NewPhotoForm.querySelector('[name=photo-url]');

// находим кнопку добавить новую фотографию, она же открывает popup форму
const AddNewPhotoButton = document.querySelector('.profile__add-button');

// находим кнопку закрыть popup с формой добавления карточки
const closeNewPhotoPopupButton = NewPhotoPopup.querySelector('.popup__close-button');

// метод открытия popup-а путем добавления класса
const openNewPhotoPopup = function () {
  NewPhotoPopup.classList.add('popup_opened');
}

// метод закрытия popup-а путем удаления класса
const closeNewPhotoPopup = function () {
  NewPhotoPopup.classList.remove('popup_opened');
}
/*
// метод добавления новой карточки вначале списка (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы
const saveProfileChanges = function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeEditPopup();
} */

// слушатель на кнопке добавить фотографию
AddNewPhotoButton.addEventListener('click', openNewPhotoPopup);

// слушатель на кнопке закрыть попап
closeNewPhotoPopupButton.addEventListener('click', closeNewPhotoPopup);
