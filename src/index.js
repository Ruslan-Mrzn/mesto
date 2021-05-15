// не забыть сделать type="module" на js файл, в который идет импорт
import './pages/index.css'; // добавим импорт главного файла стилей
import { // импортируем константы
  settings, // объект с настройками для валидации форм
  initialCards, // начальный массив фотографий
  profileEditPopupOpenButton, // кнопка редактировать профиль
  newPhotoPopupOpenButton, // кнопка добавить новую карточку
  photoGallerySelector, //селектор контейнера где будут появляться карточки
  imagePopupSelector, //селектор модалки для картинок
  profileEditPopupSelector, //селектор модалки редактирования профиля
  newPhotoPopupSelector, //селектор модалки добавления новой карточки
  cardTemplateSelector, //селектор шаблона карточки
  profileNameSelector, // селектор имени пользователя
  profileDescriptionSelector, //селетор информации о пользователе
} from './utils/constants.js';

import Card from './components/Card.js'; // добавляем возможность создать карточки (класс)
import FormValidator from './components/FormValidator.js'; // добавляем возможность валидировать формы (класс)
import Section from './components/Section.js'; // отвечает за отрисовку элементов на странице (класс)
import PopupWithImage from './components/PopupWithImage.js'; // все действия с модалкой для картинок (класс)
import PopupWithForm from './components/PopupWithForm.js'; // все действия с модалками для форм (класс)
import UserInfo from './components/UserInfo.js'; // управление полями-ввода профиля


// добавим события на кнопки открытия модалок:
profileEditPopupOpenButton.addEventListener('click', openProfileEditPopup); // Редактировать профиль
newPhotoPopupOpenButton.addEventListener('click', openNewPhotoPopup); // Добавить фотографию

// запишем экземпляр информации о пользователе в переменную
const profileInfo = new UserInfo({
  profileName: profileNameSelector, // селектор имени пользователя
  profileDescription : profileDescriptionSelector //селетор информации о пользователе
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
const saveProfileChanges = (evt, profileData) => {
  evt.preventDefault();
  profileInfo.setUserInfo(profileData);
  profileEditPopup.close();
}

// колбэк-функция сабмита формы добавления новой карточки:
const createNewPhotoCard = (evt, photoData) => { // передаем объект, собранный из данных полей формы
  evt.preventDefault();//отмена отправки формы
  // для отрисовки новой карточки используем существующий экземпляр photoGallery:
  const dataObject = {name: photoData.title, link: photoData.url}; // для удобства сохраним объект в переменную
  const card = new Card(dataObject, cardTemplateSelector, imagePopup.open); // в переменную запишем экземпляр класса карточки
  const cardElement = card.createPhotoCard(); // воспользуемся публичным методом класса Card для создания карточки
  photoGallery.addItemToStart(cardElement); // воспользуемся публичным методом класса Section для добавления карточки в список
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
const photoGallery = new Section ({ // это блок с начальными карточками (6 шт.)
  items: initialCards, //передали начальный массив фотографий и названий,
  //опишем функцию для отрисовки элементов:
  renderer: (item) => { // это стрелочная функция, на вход принимает объект (в данном случае элемент массива)
    const card = new Card(item, cardTemplateSelector, imagePopup.open); // в переменную запишем экземпляр класса карточки
    const cardElement = card.createPhotoCard(); // воспользуемся публичным методом класса Card для создания карточки
    photoGallery.addItem(cardElement); // воспользуемся публичным методом класса Section для добавления карточки в список
  }
},
photoGallerySelector //селектор контейнера для отрисовки (потом добавить в переменные!)
)
// публичный метод отрисовки элементов массива (по сути вызов стрелочной ф-ии renderer для каждого элемента массива)
photoGallery.renderItems(); // добавим карточки в пустой список
/* ---------------------------------------------------------------- */


/* В А Л И Д А Ц И Я   Ф О Р М */
// запишем экземпляры валидации для каждой формы в отдельные переменные:
const profileEditFormValidator = new FormValidator(profileEditPopup.form, settings); //экземпляр для валидации профиля
const newPhotoFormValidator = new FormValidator(newPhotoPopup.form, settings); //экземпляр для валидации добавления фото
// теперь вызовем публичный метод валидации на экземплярах форм:
profileEditFormValidator.enableValidation(); //запустили валидацию профиля
newPhotoFormValidator.enableValidation(); //запустили валидацию добавления фото
/* ---------------------------------------------------------- */
