'use strict';


let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать ?');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?', '10000');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?', '5000');

let rollback = 10;
let fullPrice;
let servicePercentPrice;
let allServicePrice;

const getAllServicePrice = function () {
	return servicePrice1 + servicePrice2;
};

function getFullPrice() {
	return screenPrice + allServicePrice;
}

function getTitle() {
	return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
}

function getServicePercentPrices() {
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

allServicePrice = getAllServicePrice();
fullPrice = getFullPrice();
title = getTitle();
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
showScreens();

console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
console.log(screens.toLowerCase().split(', '));