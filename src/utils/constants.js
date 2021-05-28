// объект с настройками для валидации форм:
export const settings = {
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__error_visible',
}

//кнопка редактировать профиль
export const profileEditPopupOpenButton = document.querySelector('.profile__edit-button');

//кнопка добавить новую карточку
export const newPhotoPopupOpenButton = document.querySelector('.profile__add-button');

//элемент редактировать аватарку
export const avatarEditPopupOpenButton = document.querySelector('.profile__avatar');

//селектор контейнера где будут появляться карточки
export const photoGallerySelector = '.photo-gallery__list';

//селектор модалки для картинок
export const imagePopupSelector = '.popup_type_image';

//селектор модалки редактирования профиля
export const profileEditPopupSelector = '.popup_type_edit';

//селектор модалки добавления новой карточки
export const newPhotoPopupSelector = '.popup_type_add';

//селектор модалки подтверждения
export const actSubmitPopupSelector = '.popup_type_submit';

//селектор модалки аватарки
export const avatarEditPopupSelector = '.popup_type_avatar';

//селектор шаблона карточки
export const cardTemplateSelector = '.template-photo-card';

// селектор имени пользователя
export const profileNameSelector = '.profile__name';

//селетор информации о пользователе
export const profileDescriptionSelector = '.profile__description';

//селетор аватара пользователя
export const profileAvatarSelector = '.profile__img';
