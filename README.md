# Место - интерактивная страница с фотографиями

* [Ссылка](https://ruslan-mrzn.github.io/mesto/index.html "сервис Mesto"), по которой доступен проект.

## Фукциональность проекта :
* доступен просмотр фотографий c возможностью добавления/удаления через взаимодействие с сервером;
* форма редактирования профиля работает и сохраняет данные на сервер;
* формы на странице валидируются с помощью Javascript;

## Технологии в проекте:
Это учебный проект. Цель - создать интерфейс сервиса для размещения фотографий на сервере.

**HTML:**
* "семантичная" разметка страницы;
* БЭМ-именование классов в HTML-тэгах;

**CSS:**
* Подключение локальных шрифтов при помощи директивы ```css @font-face ```;
* Подключение файлов-стилей в одном общем файле-стиле при помощи директивы ```css @import ```;
* Flex-раскладка сеток;
* Grid-раскладка сеток;
* Адаптивность при помощи медиа-запросов ```css @media ```;
* Pixel Perfect;
* Эффекты при наведении на интреактивные элементы;
* Плавность открытия и закрытия модальных окон.

**Javascript:**
* валидация форм;
* использование классов при создании новых экземпляров объектов;
* использование API и серверных запросов.

**Общая файловая структура:**
* использование технологии БЭМ Nested.

## Для локальной разработки:
1. Клонируем репозиторий и заходим в директорию с проектом командой в консоли ```git clone https://github.com/Ruslan-Mrzn/mesto.git cd mesto```
2. Устанавливаем зависимости для корректной работы проекта командой в консоли ``` npm install ```
3. Запускаем проект локально командой в консоли ``` npm run dev ```
4. Проект должен открыться во вкладке браузера ``` http://localhost:3000 ```
