// Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Этот класс должен:
// Принимать в конструктор объект настроек с классами формы;

// Принимать в конструктор ссылку на HTML-элемент проверяемой формы;

// Содержать приватные методы для обработки формы;

// «Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса».

export class FormValidator {
  constructor (form, settings) { //принимает
    // ссылку на HTML-элемент проверяемой формы:
    this._form = form; // при создании экземпляра здесь будет переданная в конструктор форма
    // объект настроек для формы:
    this._inputSelector = settings.inputSelector; // инпут
    this._submitButtonSelector = settings.submitButtonSelector; // кнопка сабмита
    this._inactiveButtonClass = settings.inactiveButtonClass; // неативное отображение
    this._inputErrorClass = settings.inputErrorClass; // красная черта снизу
    this._errorClass = settings.errorClass; // спан-ошибка

    // попробуем определить доп. свойства:
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector)); // массив всех инпутов
    this._formSubmitButton = this._form.querySelector(this._submitButtonSelector); // кнопка сабмита формы

  }

  enableValidation() { // публичный метод включения валидации формы
    this._form.addEventListener('submit', evt => evt.preventDefault()); // отменим отправку формы
    this._setEventListeners(); // устанавливаем слушатели и не только
  }

  checkFormValidity() { // публичный метод проверки валидности формы при открытии, до внесения изменений:
    this._inputs.forEach(input => { // для каждого инпута в форме
      if (input.value !== '') { // если он не пустой
        this._checkInputValidity(input); // проверим валидность инпута
      } else { // иначе (если пустой)
        this._hideError(input); // скрой ошибки на инпуте
      }
      this._changeButtonState(); // проверим нужно ли менять состяние кнопки сабмита
    })
  }

  _setEventListeners() { // приватный метод установки слушателей формы:
    // проверим состояние инпутов до изменения и зададим состояние кнопки сабмита
    this._changeButtonState();

    this._inputs.forEach(input => { // для каждого инпута в форме
      input.addEventListener('input', () => { // при каждом изменении значения
        this._checkInputValidity(input); // проверим валидность инпута
        this._changeButtonState(); // проверим нужно ли менять сосотяние кнопки сабмита
      })
    });
  }

  _changeButtonState() { // приватный метод изменения состояния кнопки сабмита
    if (this._hasInvalidInput()) { // если есть невалидный инпут внутри текущей формы
      this._formSubmitButton.setAttribute('disabled', ''); // добавим атрибут на кнопку нельзя "нажать"
      this._formSubmitButton.classList.add(this._inactiveButtonClass); // изменим внешний вид типа недоступна
    } else { //иначе, если в форме все инпуты были/стали валидны
        this._formSubmitButton.removeAttribute('disabled'); // удалим атрибут, снова можно "нажимать" на кнопку
        this._formSubmitButton.classList.remove(this._inactiveButtonClass); // изменим внешний вид типа доступна
      }
  }

  _hasInvalidInput() { // приватный метод проверки в форме на возврат невалидных инпутов
    return this._inputs.some(input => { // если хоть один инпут
      return !input.validity.valid; // возвращает Boolean да/нет (типа ответ на вопрос названия функции)
    });
  }

  _checkInputValidity(input) { // приватный метод проверки валидности инпута
    if(input.validity.valid) { // если инпут валидный
      this._hideError(input); //скрой ошибки
    } else { //если не валидыный
        this._showError(input); // покажи ошибки
      }
  }

  _hideError(input) { // приватный метод скрытия ошибки (принимает на вход инпут)
    const errorElement = this._form.querySelector(`.${input.name}-error`); //поиск класса по шаблону уникальных имен инпутов
    input.classList.remove(this._inputErrorClass); // удалим красную полоску невалидности
    errorElement.textContent = ''; // очистим спан
    errorElement.classList.remove(this._errorClass); // скроем span
  }

  _showError(input) { // приватный метод показа ошибки (принимает на вход инпут)
    const errorElement = this._form.querySelector(`.${input.name}-error`); //поиск класса по шаблону уникальных имен инпутов
    input.classList.add(this._inputErrorClass); // инпуту добавим красную полоску невалидности
    errorElement.textContent = input.validationMessage; // зададим стандартную браузерную текст-ошибку инпута для его спана
    errorElement.classList.add(this._errorClass); // и покажем этот span
  }
}
