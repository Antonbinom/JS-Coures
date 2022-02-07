'use strict';

const appData = {
	title: '',
	screens: [],
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
		appData.title = prompt('Как называется ваш проект?', 'New');

		for (let i = 0; i < 2; i++) {
			let name = prompt('Какие типы экранов нужно разработать?');
			let price = 0;

			do {
				price = prompt('Сколько будет стоить данная работа?', '12000');
			}
			while (!appData.isNumber(price));

			appData.screens.push({
				id: i,
				name: name,
				price: price
			});
		}

		for (let i = 0; i < 2; i++) { // перебираем вопросы
			let name = prompt('Какой дополнительный тип услуги нужен?');
			let price = 0;

			do { // выводим вопрос
				appData.servicePrice = prompt('Сколько это будет стоить?', '3000');
			}
			while (!appData.isNumber(price)); // пока не пройдет проверку выводит вопрос

			appData.services[name] = +price;
		}

		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},

	addPrices: function () {
		for (let screen of appData.screens) {
			appData.screenPrice += +screen.price;
		}

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
	}

};

appData.start();