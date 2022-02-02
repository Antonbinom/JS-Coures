'use strict';

let title;
let screens;
let adaptive;
let service1;
let service2;
let screenPrice;
let servicePrice;
let fullPrice;
let allServicePrice;
let servicePercentPrice;
let rollback = 10;
let sum;

const isNumber = function (num) { // объявляю функцию isNumber в которой...
	return !isNaN(parseFloat(num) && isFinite(num)); // возвращаю условие "не"NaN(пропускающее число с точкой и конечное число)
};

const asking = function () { // функция в которую помещаем "вопросы"
	title = prompt('Как называется ваш проект?', 'New');
	screens = prompt('Какие типы экранов нужно разработать?', 'Простые, интерактивные');

	do { // выводим вопрос
		screenPrice = prompt('Сколько будет стоить данная работа?', '12000');
	} while (!isNumber(screenPrice)); // если не проходит проверку то, будет снова и снова выводит вопрос


	adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function () {
	sum = 0;

	for (let i = 0; i < 2; i++) { // перебираем вопросы

		if (i === 0) { // запускаем цикл, который выводит по очереди вопросы
			service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
		} else if (i === 1) {
			service2 = prompt('Какой дополнительный тип услуги нужен?', 'Чат-бот');
		}

		do { // выводим вопрос
			servicePrice = prompt('Сколько это будет стоить?', '3000');
		}
		while (!isNumber(servicePrice)); // пока не пройдет проверку выводит вопрос
		sum = sum + parseInt(servicePrice); // при выполнении каждой итерации суммирует введенное значение с sum
	}
	return sum; // выводит сумму всех введенных значений
};

function getFullPrice() {
	return screenPrice + allServicePrice;
}

function getTitle() {
	return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
}

function getServicePercentPrice() {
	return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}

function showTypeOf(variable) {
	console.log(variable, typeof variable);
}

function showScreens() {
	console.log(screens.toLowerCase().split().join());
}

function getRollbackMessage() {
	if (fullPrice >= 30000) {
		return 'Даем скидку в 10 %';
	} else if (fullPrice >= 15000 && fullPrice < 30000) {
		return 'Даем скидку в 5%';
	} else if (fullPrice >= 0 && fullPrice < 15000) {
		return 'Скидка не предусмотрена';
	} else {
		return 'Что то пошло не так';
	}
}
asking(); // запускаем функцию внутри которой переменные с вопросами
allServicePrice = getAllServicePrices();
screenPrice = parseFloat(screenPrice);
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrice();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
showScreens();

console.log('Сумма всех дополнительных услуг', allServicePrice + ' рублей');
console.log('Сумма всех услуг ' + fullPrice + ' рублей');
console.log(getRollbackMessage(fullPrice));
console.log('Итог с учетом отката ' + servicePercentPrice + ' рублей');
console.log('Верстка секций - ' + screens.toLowerCase().split(','));