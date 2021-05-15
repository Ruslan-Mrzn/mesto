// объект с настройками для валидации форм:
export const settings = {
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__error_visible',
}

// начальный массив фотографий из 5-й работы
export const initialCards = [
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

//кнопка редактировать профиль
export const profileEditPopupOpenButton = document.querySelector('.profile__edit-button');

//кнопка добавить новую карточку
export const newPhotoPopupOpenButton = document.querySelector('.profile__add-button');

//селектор контейнера где будут появляться карточки
export const photoGallerySelector = '.photo-gallery__list';

//селектор модалки для картинок
export const imagePopupSelector = '.popup_type_image';

//селектор модалки редактирования профиля
export const profileEditPopupSelector = '.popup_type_edit';

//селектор модалки добавления новой карточки
export const newPhotoPopupSelector = '.popup_type_add';

//селектор шаблона карточки
export const cardTemplateSelector = '.template-photo-card';

// селектор имени пользователя
export const profileNameSelector = '.profile__name';

//селетор информации о пользователе
export const profileDescriptionSelector = '.profile__description';
