// Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:

// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
// Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.

// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.

// Содержит публичный метод, который отвечает за отрисовку всех элементов.
// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.

// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.

export default class Section {
  // конструктор принимает 2 параметра:
  constructor({items, renderer}, containerSelector) { //1.объект и 2.селектор контейнера для отрисовки
    this._items = items; // массив данных для отрисовки (передается в конструктор)
    this._renderer = renderer; // функция, отвечающая за создание и отрисовку элементов
    this._container = document.querySelector(containerSelector); // ссылка на контейнер (селектор передается в конструктор)
  }

  // по условию задачи есть метод:
  addItem(element) { // принимает DOM-элемент
    this._container.append(element); // и добавляет его в контейнер
  }

  // немного расширим функционал класса:
  addItemToStart(element) { // принимает DOM-элемент
    this._container.prepend(element); // и добавляет его в начало контейнера
  }

  // по условию задачи:
  renderItems() { //есть метод
    this._items.forEach(item => { // каждый отдельный элемент массива
      this._renderer(item); // отрисовывается функцией renderer (передается в конструктор)
    });
  }
}
