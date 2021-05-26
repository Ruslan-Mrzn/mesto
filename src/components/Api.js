// Для работы с API создайте класс Api.
// Все запросы должны быть методами этого класса:
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // получение данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

  }

  // получение массива начальных карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // сохранение данных пользователя
  saveProfileData(profileData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${profileData.name}`,
        about: `${profileData.about}`
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // добавление новой карточки
  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${cardData.title}`,
        link: `${cardData.url}`,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // удаление своих карточек
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }




  // другие методы работы с API
}







// /* API */
// fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me ', {
//   headers: {
//     authorization: 'e8edd25c-68cd-4899-918e-51e937828043'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
