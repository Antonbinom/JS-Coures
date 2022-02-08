'use strict';

const titleCollect = document.getElementsByTagName('h1');
const title = titleCollect[0];
const btnCollect = document.getElementsByClassName('handler_btn');
const btnPlus = document.querySelector('.screen-btn');
const itemsPercent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number');
const inputType = document.querySelector('.rollback input[type="range"]');
const span = document.querySelector('.rollback .range-value');
const inputCollect = document.getElementsByClassName('total-input');
const input1 = inputCollect[0];
const input2 = inputCollect[1];
const input3 = inputCollect[2];
const input4 = inputCollect[3];
const input5 = inputCollect[4];
let screen = document.querySelectorAll('.screen');

const appData = {
	title: '',
	screens: [], // пустой массив
	adaptive: true,
	services: {},
	screenPrice: 0,
	fullPrice: 0,
	allServicePrices: 0,
	servicePercentPrice: 0,
	rollback: 10,

	start: function () {
		appData.asking(); // запускаем функцию внутри которой переменные с вопросами
		appData.addPrices();
		appData.getFullPrice();
		appData.getServicePercentPrice();
		appData.getTitle();
		appData.logger();
	},

	isNumber: function (num) { // объявляю функцию isNumber в которой...
		return !isNaN(parseFloat(num)) && isFinite(num); // возвращаю условие "не"NaN(пропускающее число с точкой и конечное число)
	},

	asking: function () { // функция в которую помещаем "вопросы"

		do {
			appData.title = prompt('Как называется ваш проект?', 'New');
		}
		while (appData.isNumber(appData.title) || appData.title == 0);

		for (let i = 0; i < 2; i++) {
			let name;
			let price = 0;
			do {
				name = prompt('Какие типы экранов нужно разработать?');
			}
			while (appData.isNumber(name) || name == 0);

			do {
				price = prompt('Сколько будет стоить данная работа?', '12000');
			}
			while (!appData.isNumber(price));

			appData.screens.push({
				id: i,
				name: name,
				price: +price
			});
		}

		for (let i = 0; i < 2; i++) { // перебираем вопросы
			let name;
			let price = 0;
			do {
				name = i + '.' + prompt('Какой дополнительный тип услуги нужен?');
			}
			while (appData.isNumber(name) || name == 0);

			do { // выводим вопрос
				price = prompt('Сколько это будет стоить?', '3000');
			}
			while (!appData.isNumber(price)); // пока не пройдет проверку выводит вопрос

			appData.services[name] = +price;

		}

		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},
	addPrices: function () {
		appData.screenPrice = appData.screens.reduce(function (sum, item) {
			return sum + item.price;
		}, 0);

		for (let key in appData.services) {
			appData.allServicePrices += appData.services[key];
		}
	},

	getFullPrice: function () {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
	},

	getTitle: function () {
		appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
	},

	getServicePercentPrice: function () {
		appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
	},

	getRollbackMessage: function () {
		if (appData.fullPrice >= 30000) {
			return 'Даем скидку в 10 %';
		} else if (appData.fullPrice >= 15000 && appData.fullPrice < 30000) {
			return 'Даем скидку в 5%';
		} else if (appData.fullPrice >= 0 && appData.fullPrice < 15000) {
			return 'Скидка не предусмотрена';
		} else {
			return 'Что то пошло не так';
		}
	},
	logger: function () {
		console.log('Сумма всех услуг ' + appData.fullPrice + ' рублей');
		console.log(appData.getRollbackMessage(appData.fullPrice));
		console.log('Итог с учетом отката ' + appData.servicePercentPrice + ' рублей');
		console.log(appData.screens);
		console.log(appData.services);
	}
};

appData.start();