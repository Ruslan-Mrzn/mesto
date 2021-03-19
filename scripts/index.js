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
  // так же совместим открытие попапа с добавлением информации в input-ы формы
  // для улучшения читабельности кода изменили setAttribute на свойство value
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // перенести открытие popup в конец функции, чтобы показать конечный результат
  popup.classList.add('popup_opened');
}

// метод закрытия popup-а путем удаления класса
let closePopup = function () {
  popup.classList.remove('popup_opened');
  // удалили из функции "лишний" код, т.к. при закрытии данные никуда копироваться не должны
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
