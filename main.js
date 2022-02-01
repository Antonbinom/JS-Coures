(function () {
	'use strict';
})();

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать ?');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?', '10000');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?', '5000');
let rollback = 10;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

const getAllServicePrice = function (service1, service2) {
	return service1 + service2;
};

function getFullPrice(mainService, addServices) {
	return mainService + addServices;
}

function getTitle(title) {
	return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}

function getServicePercentPrices(fullPrice, rollback) {
	return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}

function showTypeOf(variable) {
	return console.log(variable, typeof variable);
}

function showScreens() {
	return console.log(screens.toLowerCase().split().join());
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

const allServicePrice = getAllServicePrice(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrice);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
showScreens();

console.log(getRollbackMessage());
console.log(servicePercentPrice);
console.log(screens.toLowerCase().split(', '));