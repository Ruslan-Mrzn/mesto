// в первую очередь необходимо импортировать классы (не забыть сделать type="module" на js файл, в который идет импорт)
import Card from './components/Card.js'; // добавляем возможность создать карточки
import FormValidator from './components/FormValidator.js'; // добавляем возможность валидировать формы
import Section from './components/Section.js'; // отвечает за отрисовку элементов на странице;


// объект с настройками для валидации форм:
const settings = {
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__error_visible',
}

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
  // воспользуемся публичным методом класса:
  profileEditFormValidator.checkFormValidity(); //проверим форму перед открытием модалки
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
  // воспользуемся публичным методом класса:
  newPhotoFormValidator.checkFormValidity(); //проверим форму перед открытием модалки
  // затем открыть модалку, добавив класс:
  openPopup(newPhotoPopup);
}

// 3. Метод открытия модалки изображения
function openImagePopup(objName, objLink) {
  // заполним пустую модалку данными:
  imagePopup.querySelector('.image-popup__title').textContent = objName; // описание изображения
  imagePopup.querySelector('.image-popup__photo').src = objLink; // ссылка на изображение
  imagePopup.querySelector('.image-popup__photo').alt = objName; // alt изображения
  // затем открыть модалку, добавив класс:
  openPopup(imagePopup);
}


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

// добавим закрытие модалок кликом на темный фон вокруг модалки (overlay):
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




/* Р Е Н Д Е Р И Н Г   К А Р Т О Ч Е К   И З   Н А Ч А Л Ь Н О Г О   М А С С И В А */

// запишем в переменную экземпляр класса для отрисовки с нужными параметрами:
const photoGallery = new Section ({ // это блок с начальными карточками (6 шт.)
  items: initialCards, //передали начальный массив фотографий и названий,
  //опишем функцию для отрисовки элементов:
  renderer: (item) => { // это стрелочная функция, на вход принимает объект (в данном случае элемент массива)
    const card = new Card(item, '.template-photo-card', openImagePopup); // в переменную запишем экземпляр класса карточки
    const cardElement = card.createPhotoCard(); // воспользуемся публичным методом класса Card для создания карточки
    photoGallery.addItem(cardElement); // воспользуемся публичным методом класса Section для добавления карточки в список
  }
},
'.photo-gallery__list' //селектор контейнера для отрисовки (потом добавить в переменные!)
)
// публичный метод отрисовки элементов массива (по сути вызов стрелочной ф-ии renderer для элемента массива)
photoGallery.renderItems();
/* ---------------------------------------------------------------- */


/* Д О Б А В Л Е Н И Е   Н О В О Й   К А Р Т О Ч К И   П О Л Ь З О В А Т Е Л Е М */
// при создании новой карточки, конструктор класса принимает на вход объект,
// а добавление новой карточки по своему смыслу повторяет идею создания карточки.
// Поэтому при заполнении полей формы будем генерировать объект,
// и этот передадим в конструктор класса Card:

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
  const container = document.querySelector('.photo-gallery__list');
  event.preventDefault();//отмена отправки формы
  //передадим объект как результат выполнения функции
  container.prepend(new Card(getObjectFromNewPhotoForm(), '.template-photo-card', openImagePopup).createPhotoCard());
  // добавим карточку в начале фотогалереи
  closePopup(newPhotoPopup);// и закроем модалку
}
/* --------------------------------------------------------------- */

// событие на форме добавления новой карточки при нажатии на кнопку submit
newPhotoForm.addEventListener('submit', createNewPhotoCard);

/* В А Л И Д А Ц И Я   Ф О Р М*/
// запишем экземпляры валидации для каждой формы в отдельные переменные:
const profileEditFormValidator = new FormValidator(profileEditForm, settings); //экземпляр для валидации профиля
const newPhotoFormValidator = new FormValidator(newPhotoForm, settings); //экземпляр для валидации добавления фото

// теперь вызовем публичный метод валидации на экземплярах форм:
profileEditFormValidator.enableValidation(); //запустили валидацию профиля
newPhotoFormValidator.enableValidation(); //запустили валидацию добавления фото
/* ---------------------------------------------------------- */

// renderPhotoCards(initialCards) //вызвали функцию и передали ей начальный массив фотографий и названий
