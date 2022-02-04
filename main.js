'use strict';


const isNumber = function (num) { // объявляю функцию isNumber в которой...
	return !isNaN(parseFloat(num) && isFinite(num)); // возвращаю условие "не"NaN(пропускающее число с точкой и конечное число)
};

const appData = {
	title: '',
	screens: '',
	adaptive: true,
	service1: '',
	service2: '',
	screenPrice: 0,
	servicePrice: 0,
	fullPrice: 0,
	allServicePrice: 0,
	servicePercentPrice: 0,
	rollback: 10,

	asking: function () { // функция в которую помещаем "вопросы"
		appData.title = prompt('Как называется ваш проект?', 'New');
		appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, интерактивные');

		do { // выводим вопрос
			appData.screenPrice = prompt('Сколько будет стоить данная работа?', '12000');
		} while (!isNumber(appData.screenPrice)); // если не проходит проверку то, будет снова и снова выводит вопрос

		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},

	getAllServicePrices: function () {
		let sum = 0;

		for (let i = 0; i < 2; i++) { // перебираем вопросы

			if (i === 0) { // запускаем цикл, который выводит по очереди вопросы
				appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
			} else if (i === 1) {
				appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Чат-бот');
			}

			do { // выводим вопрос
				appData.servicePrice = prompt('Сколько это будет стоить?', '3000');
			}
			while (!isNumber(appData.servicePrice)); // пока не пройдет проверку выводит вопрос
			sum += parseInt(appData.servicePrice); // при выполнении каждой итерации суммирует введенное значение с sum
		}
		return sum; // выводит сумму всех введенных значений
	},

	getFullPrice: function () {
		return appData.screenPrice + appData.allServicePrice;
	},

	getTitle: function () {
		return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
	},

	getServicePercentPrice: function () {
		return Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
	},

	showScreens: function () {
		appData.screens.toLowerCase().split().join();
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

	start: function () {
		appData.asking(); // запускаем функцию внутри которой переменные с вопросами
		appData.allServicePrice = appData.getAllServicePrices();
		appData.screenPrice = parseFloat(appData.screenPrice);
		appData.fullPrice = appData.getFullPrice();
		appData.title = appData.getTitle();
		appData.servicePercentPrice = appData.getServicePercentPrice();
		appData.showScreens();
		appData.logger();
	},

	logger: function () {
		console.log('Верстка секций - ' + appData.screens.toLowerCase().split(','));
		console.log('Сумма всех дополнительных услуг', appData.allServicePrice + ' рублей');
		console.log('Сумма всех услуг ' + appData.fullPrice + ' рублей');
		console.log(appData.getRollbackMessage(appData.fullPrice));
		console.log('Итог с учетом отката ' + appData.servicePercentPrice + ' рублей');
		for (let key in appData) {
			console.log(key);
		}
	}

};

appData.start();