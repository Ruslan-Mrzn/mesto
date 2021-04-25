import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

Array.from(document.forms).forEach(form => new FormValidator(form, settings).enableValidation());

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


// найдем все кнопки открытия модалок:
const profileEditPopupOpenButton = document.querySelector('.profile__edit-button'); //1. редактировать профиль
const newPhotoPopupOpenButton = document.querySelector('.profile__add-button'); //2. добавить новую карточку
// const ImagePopupOpenElements = Array.from(document.querySelectorAll('.photo-card__img')); //3. все изображения для открытия
// console.log(ImagePopupOpenElements)
//3. Для открытия модалки изображения используется фото из карточки,
//   поэтому его нужно находить для каждой карточки в момент её создания.

// Опишем логику открытия модалок, через колбэк-функции на событие клика.
// Создадим одну общую функцию для добавления класса модалкам:
function openPopup(popup) { // на вход функция будет принимать модалку
  popup.classList.add('popup_opened'); // добавим модалке класс для отображения
  document.addEventListener('keydown', pressEscapeButton);
};

// Cоздадим колбэк-функции для открытия модалок:
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
  new FormValidator(profileEditForm, settings).checkFormValidity(); //checkFormValidity (profileEditForm, settings); //проверим форму перед открытием модалки
  // затем открыть модалку, добавив класс:
  openPopup(profileEditPopup);

}

// 2. Метод открытия модалки добавления новой карточки:
const newPhotoForm = newPhotoPopup.querySelector('.form'); // форма добавления новой карточки
const photoTitleInput = newPhotoForm.querySelector('[name=photo-title]'); // инпут для заголовка фото
const photoUrlInput = newPhotoForm.querySelector('[name=photo-url]'); // инпут для url-адреса фото

function openNewPhotoPopup() {
  // перед открытием модалки, очистить инпуты:
  photoTitleInput.value = '';
  photoUrlInput.value = '';
  new FormValidator(newPhotoForm, settings).checkFormValidity(); // checkFormValidity (newPhotoForm, settings); //проверим форму перед открытием модалки
  // затем открыть модалку, добавив класс:
  openPopup(newPhotoPopup);
}

// 3. Метод открытия модалки для изображения будет вызываться в карточке:
const imagePopupPhoto = imagePopup.querySelector('.image-popup__photo');//фото в модалке
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');//описание фото в модалке


// Опишем логику закрытия модалок на события кликов по кнопкам "закрыть":
// Сначала найдем все кнопки "закрыть" на модалках:
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close-button'); //1. закрыть модалку профиля
const newPhotoPopupCloseButton = newPhotoPopup.querySelector('.popup__close-button'); //2. закрыть модалку новой карточки
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button'); // 3. закрыть модалку изображения

// метод закрытия модалок:
function closePopup(popup) { //принимает на вход модалку
  popup.classList.remove('popup_opened'); // удаляем класс для закрытия модалки
  document.removeEventListener('keydown', pressEscapeButton);
}

// добавим события на кнопки "закрыть":
profileEditPopupCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup); //1. закрыть модалку профиля
});

newPhotoPopupCloseButton.addEventListener('click', () => {
  closePopup(newPhotoPopup); //2. закрыть модалку новой карточки
});

imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup); //3. закрыть модалку изображения
});

// добавим закрытие модалок кликом на темный фон вокруг модалки (overlay)
const popups = Array.from(document.querySelectorAll('.popup')); // найдем все модалки и сделаем массив
popups.forEach(popup => { // для каждой модалки
  popup.addEventListener('click', evt => { // на модалке добавим слушатель клика мышки
    if (evt.target.classList.contains('popup_opened')) { // если кликнули на модаку (не форму!!)
      closePopup(popup); //тогда закроем модалку
    }
  })
})

// добавим закрытие модалок нажатием на кнопку ESC
// создадим функцию
function pressEscapeButton(evt) {
  const popup = document.querySelector('.popup_opened'); // найдем открытый попап
  if (evt.key === 'Escape') { // если это кнопка = Escape
    closePopup(popup); // тогда закроем модалку
  }
}

// Теперь добавим события на кнопки открытия модалок:
profileEditPopupOpenButton.addEventListener('click', openProfileEditPopup);//1. Редактировать профиль
newPhotoPopupOpenButton.addEventListener('click', openNewPhotoPopup);// 2. Добавить фотографию
// ImagePopupOpenElements.forEach(image => { // 3. Открыть фото отдельно
//   image.addEventListener('click', () => {
//     openImagePopup(image);
//   })
// })

/* ---------------------------------------------------------------- */


/* Р Е Д А К Т И Р О В А Н И Е   П Р О Ф И Л Я */
// метод для сохранения введенной информации в форме (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы:
function saveProfileChanges(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditPopup);
}

// сохранить изменения при нажатии кнопки submit:
profileEditForm.addEventListener('submit', saveProfileChanges);
/* ---------------------------------------------------------------- */


// /* С О З Д А Н И Е   К А Р Т О Ч К И */
// // для создания карточки всегда используем содержимое template-photo-card:
// const photoCardTemplate = document.querySelector('.template-photo-card').content.querySelector('.photo-gallery__item');
const photoGallery = document.querySelector('.photo-gallery__list');//в этот список добавляем карточки


// // Теперь создадим функцию для заполнения карточки нужными данными:
// function createPhotoCard (item) { /* принимает в себя объект */
//   const photoGalleryItem = photoCardTemplate.cloneNode(true); //берем пустую заготовку карточки

//   //вынесем в переменные название карточки и изображение:
//   const cardTitle = photoGalleryItem.querySelector('.photo-card__title');//название
//   const cardImage = photoGalleryItem.querySelector('.photo-card__img');//изображение

//   //записываем значения соответсвующих ключей объекта (на входе):
//   fillPhotoData(item, cardImage, cardTitle);

//   //событие на клике по изображению --> открыть модалку с изображением
//   cardImage.addEventListener('click', () => {
//     //записываем значения соответсвующих ключей объекта (на входе):
//     fillPhotoData(item, imagePopupPhoto, imagePopupTitle);
//     // затем открыть модалку, добавив класс:
//     openPopup(imagePopup);
//   });

//   //добавим возможность "лайкать" карточки:
//   const likeButton = photoGalleryItem.querySelector('.photo-card__like-button');// кнопка "лайкнуть"
//   likeButton.addEventListener('click', evt => { //событие клик
//     if (evt.target.classList.contains('photo-card__like-button')) { // если в цели кнопка лайка
//       evt.target.classList.toggle('photo-card__like-button_type_active');// тогда переключаем класс
//     }
//   });

//   //добавим возможность удалять карточки:
//   const deleteButton = photoGalleryItem.querySelector('.photo-gallery__delete-item-button');// кнопка "удалить"
//   deleteButton.addEventListener('click', evt => { //событие клик
//     if(evt.target.classList.contains('photo-gallery__delete-item-button')) { // если кликаем по кнопке удалить
//       evt.target.closest('.photo-gallery__item').remove();// удаляем карточку
//     }
//   })
//   //функция возвращает измененную заготовку карточки:
//   return photoGalleryItem;
// }
// /* ---------------------------------------------------------------- */


/* Р Е Н Д Е Р И Н Г   К А Р Т О Ч Е К   И З   Н А Ч А Л Ь Н О Г О   М А С С И В А */
function renderPhotoCards (array) { //принимает на вход массив объектов
  array.forEach(arrayItem => { //для каждого объекта из массива объектов
    photoGallery.append(new Card(arrayItem, '.template-photo-card').createPhotoCard());// добавляет каждую карточку в конец списка
  });
}
/* ---------------------------------------------------------------- */


// /* З А П О Л Н Е Н И Е   П О Л Е Й   Ф О Т О Г Р А Ф И Й */
// // попытка вынести в функцию однообразное действие передачи значений из объекта
// function fillPhotoData (item, photo, photoTitle) {
//   photoTitle.textContent = item.name;//1. в название --> значение ключа name
//   photo.src = item.link;//2. в атрибут src изображения --> значение ключа link
//   photo.alt = item.name;//3. в атрибут alt изображения --> значение ключа name
// }
// /* ---------------------------------------------------------------- */


/* Д О Б А В Л Е Н И Е   Н О В О Й   К А Р Т О Ч К И   П О Л Ь З О В А Т Е Л Е М */
// Функция createPhotoCard принимает на вход объект, а добавление новой карточки
// по своему смыслу повторяет идею createPhotoCard.
// Поэтому при заполнении полей формы будем генерировать объект,
// и этот передадим в функцию createPhotoCard:

function getObjectFromNewPhotoForm() {
  const addedCard = {};//создадим пустой объект
  //заполним объект:
  addedCard.name = photoTitleInput.value;//1. из поля "Название"
  addedCard.link =  photoUrlInput.value;//2. из поля "Ссылка на картинку"

  return addedCard //вернули заполненный объект
};

// метод добавления новой карточки вначале списка (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы:
function createNewPhotoCard (event) {
  event.preventDefault();//отмена отправки формы

  //передадим объект как результат выполнения функции
  photoGallery.prepend(new Card(getObjectFromNewPhotoForm(), '.template-photo-card').createPhotoCard());// добавим карточку в начале фотогалереи
  closePopup(newPhotoPopup);// и закроем модалку
}
/* --------------------------------------------------------------- */

// событие на форме добавления новой карточки при нажатии на кнопку submit
newPhotoForm.addEventListener('submit', createNewPhotoCard);

renderPhotoCards(initialCards) //вызвали функцию и передали ей начальный массив фотографий и названий





