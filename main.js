(function () {
	'use strict';
}());

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать ?', 'Простые, Сложные, Интерактивные');
let screensPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'посадка на CMS, размещение на хостинге');
let servicePrice1 = +prompt('Сколько это будет стоить?', '5000, 10000');
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'посадка на CMS, размещение на хостинге');
let servicePrice2 = +prompt('Сколько это будет стоить?', '5000, 10000');
let rollback = 10;

let fullPrice = screensPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
console.log(servicePercentPrice);

switch (true) {
	case fullPrice >= 30000:
		console.log('Даем скидку в 10%');
		break;
	case fullPrice >= 15000 && fullPrice < 30000:
		console.log('Даем скидку в 5%');
		break;
	case fullPrice >= 0 && fullPrice < 15000:
		console.log('Скидка не предусмотрена');
		break;
	case fullPrice < 0:
		console.log('Что то пошло не так');
		break;
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screensPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

let screensLow = screens.toLowerCase().split(', ');
console.log(screensLow);

console.log(fullPrice * (rollback / 100));