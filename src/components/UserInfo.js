// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

export default class UserInfo {
  constructor({profileName, profileDescription}) {
    this._profileName = document.querySelector(profileName); // имя профиля
    this._profileDescription = document.querySelector(profileDescription); // описание профиля
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    }

  }

  setUserInfo(profileData) {
    this._profileName.textContent = profileData.name;
    this._profileDescription.textContent = profileData.description;
  }
}
