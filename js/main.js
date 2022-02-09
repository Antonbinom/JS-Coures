'use strict';

const spam = document.querySelector('.adv')
const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');
const bookTitle = document.querySelectorAll('.book > h2 > a');
const bookTwoLi = book[0].querySelectorAll('li');
const bookFiveLi = book[5].querySelectorAll('li');
const bookSixLi = book[2].querySelectorAll('li');
const cloneLi = bookSixLi[0].cloneNode(true);

// Удалить рекламу
spam.remove();

// Расставить книги в правильном порядке
book[0].before(book[1]);
book[4].after(book[3]);
books.append(book[2]);

// Изменить фон страницы
document.body.style.backgroundImage = 'url(../image/you-dont-know-js.jpg)';

// Изменить заголовок книги
bookTitle[4].textContent = 'Книга 3. this и Прототипы Объектов';

// Расставить главы книг в правильном порядке
//Книга 2
bookTwoLi[3].after(bookTwoLi[6], bookTwoLi[8]);
bookTwoLi[9].after(bookTwoLi[2]);
//Книга 5
bookFiveLi[1].after(bookFiveLi[9]);
bookFiveLi[4].after(bookFiveLi[2]);
bookFiveLi[7].after(bookFiveLi[5]);

// Добавить главу в книге 6
cloneLi.textContent = 'Глава 8: За пределами ES6';
bookSixLi[8].after(cloneLi);