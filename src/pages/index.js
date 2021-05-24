// не забыть сделать type="module" на js файл, в который идет импорт
import './index.css'; // добавим импорт главного файла стилей
import { // импортируем константы
  settings, // объект с настройками для валидации форм
  profileEditPopupOpenButton, // кнопка редактировать профиль
  newPhotoPopupOpenButton, // кнопка добавить новую карточку
  photoGallerySelector, //селектор контейнера где будут появляться карточки
  imagePopupSelector, //селектор модалки для картинок
  profileEditPopupSelector, //селектор модалки редактирования профиля
  newPhotoPopupSelector, //селектор модалки добавления новой карточки
  cardTemplateSelector, //селектор шаблона карточки
  profileNameSelector, // селектор имени пользователя
  profileDescriptionSelector, //селетор информации о пользователе
  profileAvatarSelector, //селетор аватара пользователя
} from '../utils/constants.js';

import Card from '../components/Card.js'; // добавляем возможность создать карточки (класс)
import FormValidator from '../components/FormValidator.js'; // добавляем возможность валидировать формы (класс)
import Section from '../components/Section.js'; // отвечает за отрисовку элементов на странице (класс)
import PopupWithImage from '../components/PopupWithImage.js'; // все действия с модалкой для картинок (класс)
import PopupWithForm from '../components/PopupWithForm.js'; // все действия с модалками для форм (класс)
import UserInfo from '../components/UserInfo.js'; // управление полями-ввода профиля (класс)
import Api from '../components/Api.js'; // управление Api (класс)


// добавим события на кнопки открытия модалок:
profileEditPopupOpenButton.addEventListener('click', openProfileEditPopup); // Редактировать профиль
newPhotoPopupOpenButton.addEventListener('click', openNewPhotoPopup); // Добавить фотографию

// запишем экземпляр информации о пользователе в переменную
const profileInfo = new UserInfo({
  profileName: profileNameSelector, // селектор имени пользователя
  profileDescription: profileDescriptionSelector, //селетор информации о пользователе
  profileAvatar: profileAvatarSelector //селетор аватара пользователя
});


// колбэк-функция нажатия кнопки "Редактировать профиль"
function openProfileEditPopup() {
  // перед открытием модалки, нужно добавить информацию в инпуты формы из html-файла:
  // кастомное решение (не по заданию)
  profileEditPopup.setInputValues(profileInfo.getUserInfo());
  // воспользуемся публичным методом класса:
  profileEditFormValidator.checkFormValidity(); //проверим форму перед открытием модалки
  // затем открыть модалку, добавив класс:
  profileEditPopup.open();

}

// колбэк-функция нажатия кнопки "Добавить фото"
function openNewPhotoPopup() {
  // воспользуемся публичным методом класса:
  newPhotoFormValidator.checkFormValidity(); //проверим форму перед открытием модалки
  newPhotoPopup.open(); // откроем модалку
}

// колбэк-функция сабмита формы редактирования профиля:
const saveProfileChanges = (profileData) => {
  // сохранение измененных данных пользователя на сервере
  api.saveProfileData(profileData)
    .then(data => {
      profileInfo.setUserInfo(data);
    })
    .catch(err => console.log(`Ошибка при обновлении данных профиля: ${err}`))
  profileEditPopup.close();
}

function createPhotoCard({ name, link, likes }, templateSelector, handleCardClick) { // вынесем создание карточки в функцию (концепция DRY)
  // в переменную запишем экземпляр класса карточки
  const card = new Card({ name, link, likes }, templateSelector, handleCardClick);
  // воспользуемся публичным методом класса Card для создания карточки и вернем её
  return card.createPhotoCard();
}

// колбэк-функция сабмита формы добавления новой карточки:
const createNewPhotoCard = (photoData) => { // передаем объект, собранный из данных полей формы
  // для отрисовки новой карточки используем существующий экземпляр photoGallery:
  api.addNewCard(photoData)
    .then(item => {
      console.log(item);
      photoGallery.addItemToStart(createPhotoCard(item, cardTemplateSelector, imagePopup.open))
    })
    .catch(err => console.log(`Ошибка при добавлении новой карточки: ${err}`))
  // const cardElement = createPhotoCard(dataObject, cardTemplateSelector, imagePopup.open); // создаем карточку
  // photoGallery.addItemToStart(cardElement); // воспользуемся публичным методом класса Section для добавления карточки в список
  //photoGallery.renderItems(); // добавим карточку в начале фотогалереи
  newPhotoPopup.close(); //закроем форму и сбросим значения полей ввода
}

/* М О Д А Л К А  Д Л Я  К А Р Т И Н О К */
// запишем экземпляр модалки с картинкой в переменную:
const imagePopup = new PopupWithImage(imagePopupSelector); // экземпляр модалки для картинок
imagePopup.setEventListeners(); // добавим слушатели событий
/* ---------------------------------------------------------------- */

/* М О Д А Л К А  Р Е Д А К Т И Р О В А Н И Я  П Р О Ф И Л Я */
// запишем экземпляр модалки с формой редактирования профиля в переменную:
const profileEditPopup = new PopupWithForm(profileEditPopupSelector, saveProfileChanges); // модалка
profileEditPopup.setEventListeners(); // добавим слушатели событий
/* ---------------------------------------------------------------- */


/* М О Д А Л К А  Д О Б А В Л Е Н И Я  Н О В О Й  К А Р Т О Ч К И */
// запишем экземпляр модалки с формой добавления новой карточки в переменную:
const newPhotoPopup = new PopupWithForm(newPhotoPopupSelector, createNewPhotoCard); // модалка добавления карточки
newPhotoPopup.setEventListeners(); // добавим слушатели событий
/* ---------------------------------------------------------------- */

/* Р Е Н Д Е Р И Н Г   К А Р Т О Ч Е К   И З   Н А Ч А Л Ь Н О Г О   М А С С И В А */
// запишем в переменную экземпляр класса для отрисовки с нужными параметрами:
const photoGallery = new Section ({ // это блок с начальными карточками
  //опишем функцию для отрисовки элементов:
  renderer: (item) => { // это стрелочная функция, на вход принимает объект (в данном случае элемент массива)
    const cardElement = createPhotoCard(item, cardTemplateSelector, imagePopup.open) // создаем карточку
    photoGallery.addItem(cardElement); // воспользуемся публичным методом класса Section для добавления карточки в список
  }
},
photoGallerySelector //селектор контейнера для отрисовки (потом добавить в переменные!)
)

/* ---------------------------------------------------------------- */


/* В А Л И Д А Ц И Я   Ф О Р М */
// запишем экземпляры валидации для каждой формы в отдельные переменные:
const profileEditFormValidator = new FormValidator(profileEditPopup.form, settings); //экземпляр для валидации профиля
const newPhotoFormValidator = new FormValidator(newPhotoPopup.form, settings); //экземпляр для валидации добавления фото
// теперь вызовем публичный метод валидации на экземплярах форм:
profileEditFormValidator.enableValidation(); //запустили валидацию профиля
newPhotoFormValidator.enableValidation(); //запустили валидацию добавления фото
/* ---------------------------------------------------------- */

/* Запросы API */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'e8edd25c-68cd-4899-918e-51e937828043',
    'Content-Type': 'application/json'
  }
});

// получение данных пользователя с сервера
api.getUserInfo() // получим объект с данными пользователя
  .then(data => {
    console.log(data)
    profileInfo.setUserInfo(data); // запишем данные в соответствующие поля
  })
  .catch(err => console.log(err))

// получение массива карточек с сервера
api.getInitialCards() // получим массив с карточками
.then(items => {
  console.log(items);
  // публичный метод отрисовки элементов массива (по сути вызов стрелочной ф-ии renderer для каждого элемента массива)
  photoGallery.renderItems(items); // добавим карточки в пустой список
})
.catch(err => console.log(err))



