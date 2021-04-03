// возьмем начальный массив фотографий из 5-й работы
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

/* М О Д А Л Ь Н Ы Е   О К Н А */

// найдем все модалки:
const profileEditPopup = document.querySelector('.popup_type_edit'); //1. модалка редактирование профиля
const newPhotoPopup = document.querySelector('.popup_type_add');//2. модалка добавление карточки
const imagePopup = document.querySelector('.popup_type_image');//3. модалка изображения
let openedPopup // любая открытая модалка

// найдем все кнопки открытия модалок:
const profileEditPopupOpenButton = document.querySelector('.profile__edit-button'); //1. редактировать профиль
const newPhotoPopupOpenButton = document.querySelector('.profile__add-button'); //2. добавить новую карточку
//3. Для открытия модалки изображения используется фото из карточки,
//   поэтому его нужно находить для каждой карточки в момент её создания.



// Опишем логику открытия модалок, через колбэк-функции на событие клика.
// Поэтому сначала создадим колбэк-функции:
// 1. Метод открытия модалки редактирования профиля:
const profileEditForm = profileEditPopup.querySelector('.form'); // форма редактирования профиля
const nameInput = profileEditForm.querySelector('[name=profile-name]'); // инпут для имени профиля
const descriptionInput = profileEditForm.querySelector('[name=profile-description]'); // инпут для описания профиля
const profileName = document.querySelector('.profile__name'); // имя профиля в html-файле
const profileDescription = document.querySelector('.profile__description'); // описание профиля в html-файле

function openProfileEditPopup() {
  // перед открытием модалки, нужно добавить информацию в инпуты формы из html-файла:
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // затем открыть модалку, добавив класс:
  profileEditPopup.classList.add('popup_opened');
  findOpenedPopup();
}


// 2. Метод открытия модалки добавления новой карточки:
const newPhotoForm = newPhotoPopup.querySelector('.form'); // форма добавления новой карточки
const photoTitleInput = newPhotoForm.querySelector('[name=photo-title]'); // инпут для заголовка фото
const photoUrlInput = newPhotoForm.querySelector('[name=photo-url]'); // инпут для url-адреса фото

function openNewPhotoPopup() {
  // перед открытием модалки, очистить инпуты:
  photoTitleInput.value = '';
  photoUrlInput.value = '';
  // затем открыть модалку, добавив класс:
  newPhotoPopup.classList.add('popup_opened');
  findOpenedPopup();
}

// 3. Метод открытия модалки для изображения пока остался в карточке...



// Опишем логику закрытия модалок, через колбэк-функцию на событие клика:
function closePopup() {
  openedPopup.classList.remove('popup_opened');
}

// Создадим функцию для поиска открытой модалки, искать будем при открытии модалок:
function findOpenedPopup() {
  openedPopup = document.querySelector('.popup_opened');//поиск будет происходить при открытии модалки
  const openedPopupCloseButton = openedPopup.querySelector('.popup__close-button');// кнопка закрыть модалку
  openedPopupCloseButton.addEventListener('click', closePopup);// событие на кнопке закрыть модалку
}

// Теперь добавим события на кнопки отрытия модалок:
profileEditPopupOpenButton.addEventListener('click', openProfileEditPopup);//1. Редактировать профиль
newPhotoPopupOpenButton.addEventListener('click', openNewPhotoPopup);// 2. Добавить фотографию
//3. Событие на изображении добавлено в карточке

/* ---------------------------------------------------------------- */




// метод для открытия попапа изображения на весь экран

const imagePopupPhoto = imagePopup.querySelector('.image-popup__photo');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button')


/* О Т Р И С О В К А   Н А Ч А Л Ь Н Ы Х   К А Р Т О Ч Е К */

// находим элемент фотогалереи из тэга template
const photoCardTemplate = document.querySelector('.template-photo-card').content.querySelector('.photo-gallery__item');


// находим пустую галерею фотографий
const photoGallery = document.querySelector('.photo-gallery__list');

/* для каждого элемента начального массива фотографий initialCards
* отрисуем фотографию в пустом на данный момент
* блоке photo-gallery__list
*/
initialCards.forEach(function(initialCard) {
  // клонируем элемент фотогалереи для каждой фото-карточки
  const photoGalleryItem = photoCardTemplate.cloneNode(true);

  // найдем кнопку "лайкнуть"
  const likeButton = photoGalleryItem.querySelector('.photo-card__like-button');

  // найжем кнопку удалить
  const deleteButton = photoGalleryItem.querySelector('.photo-gallery__delete-item-button');

  // найдем изображение карточки
  const cardImage = photoGalleryItem.querySelector('.photo-card__img');

  // найдем описание карточки
  const cardTitle = photoGalleryItem.querySelector('.photo-card__title')

  /** присваиваем элементам фото-карточки необходимые значения
    * из соответствующих значений ключей объектов
    * массива начальных фотографий initialCards
  */
  cardTitle.textContent = initialCard.name;
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;

  // добавим слушатель на кнопку "лайкнуть"
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('photo-card__like-button_type_active');
  });

  // добавим слушатель на кнопку удалить
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.photo-gallery__item').remove();
  });

  // добавим слушатель на картинку
  cardImage.addEventListener('click', () => {
    imagePopupPhoto.src = initialCard.link;
    imagePopupTitle.textContent = initialCard.name;

    imagePopup.classList.add('popup_opened');
    findOpenedPopup();
  });



  // добавление каждой фото-карточки в конце фотогалереи
  photoGallery.append(photoGalleryItem);
});

/* --------------------------------------------------------------- */


/* Р Е Д А К Т И Р О В А Н И Е   П Р О Ф И Л Я */



// метод для сохранения введенной информации в форме (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы
const saveProfileChanges = function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}


// слушатель на форме с отменой отправки формы
profileEditForm.addEventListener('submit', saveProfileChanges);

/* --------------------------------------------------------------- */


/* Д О Б А В Л Е Н И Е   Н О В О Й   К А Р Т О Ч К И   П О Л Ь З О В А Т Е Л Е М */


// метод добавления новой карточки вначале списка (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы
const createNewPhotoCard = function (event) {
  event.preventDefault();
  // клонируем элемент фотогалереи
  const photoGalleryItem = photoCardTemplate.cloneNode(true);

  // найдем кнопку "лайкнуть"
  const likeButton = photoGalleryItem.querySelector('.photo-card__like-button');

  // найжем кнопку удалить
  const deleteButton = photoGalleryItem.querySelector('.photo-gallery__delete-item-button');

  // найдем изображение карточки
  const cardImage = photoGalleryItem.querySelector('.photo-card__img');

  /** присваиваем элементам фото-карточки необходимые значения
    * из соответствующих значений полей ввода формы добавления новой карточки
  */
  photoGalleryItem.querySelector('.photo-card__title').textContent = photoTitleInput.value;
  photoGalleryItem.querySelector('.photo-card__img').src = photoUrlInput.value;

  // добавим слушатель на кнопку "лайкнуть"
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('photo-card__like-button_type_active');
  });

  // добавим слушатель на кнопку удалить
  deleteButton.addEventListener('click', function() {
    deleteButton.closest('.photo-gallery__item').remove();
  });

  // добавим слушатель на картинку
  cardImage.addEventListener('click', () => {
    imagePopupPhoto.src = photoGalleryItem.querySelector('.photo-card__img').src;
    imagePopupTitle.textContent = photoGalleryItem.querySelector('.photo-card__title').textContent;

    imagePopup.classList.add('popup_opened');
    findOpenedPopup();
  });

  // добавление каждой фото-карточки в начале фотогалереи
  photoGallery.prepend(photoGalleryItem);
  closePopup();
}


// слушатель на форме с отменой отправки формы
newPhotoForm.addEventListener('submit', createNewPhotoCard);

/* --------------------------------------------------------------- */



