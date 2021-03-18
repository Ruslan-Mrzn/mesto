//находим popup с формой
let popup = document.querySelector('.popup');

// находим форму в popup
let form = popup.querySelector('.edit-form')

// находим инпут с именем
let nameInput = form.querySelector('[name=profile-name]');

// находим инпут с описанием
let descriptionInput = form.querySelector('[name=profile-description]');

// находим кнопку редактировать профиль, она же открывает popup форму
let openPopupButton = document.querySelector('.profile__edit-button');

// находим имя профиля
let profileName = document.querySelector('.profile__name');

// находим описание профиля
let profileDescription = document.querySelector('.profile__description');

// находим кнопку закрыть popup с формой
let closePopupButton = popup.querySelector('.popup__close-button');

// метод открытия popup-а путем добавления класса
let openPopup = function () {
  popup.classList.add('popup_opened');
  // так же совместим открытие попапа с добавлением информации в input-ы формы
  nameInput.setAttribute('value', profileName.textContent);
  descriptionInput.setAttribute('value', profileDescription.textContent);
}

// метод закрытия popup-а путем удаления класса
let closePopup = function () {
  popup.classList.remove('popup_opened');
  // так же совместим закрытие попапа
  // с синхронизацией информации в input-ах формы со значениями в профиле
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// метод для сохранения введенной информации в форме (с отменой стандартного поведения - отправки формы)
// с последующим закрытием формы
let saveChanges = function (event) {
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
