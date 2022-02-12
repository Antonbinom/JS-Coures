'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input[type="range"]');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const inputCollect = document.getElementsByClassName('total-input');
const total = inputCollect[0];
const totalCount = inputCollect[1];
const totalCountOther = inputCollect[2];
const fullTotalCount = inputCollect[3];
const totalCountRollback = inputCollect[4];
let screens = document.querySelectorAll('.screen');

const appData = {
	title: '',
	adaptive: true,
	screens: [], // массив с экранами
	servicesPercent: {}, // объект с доп услугами %
	servicesNumber: {}, // объект с доп услугами цены
	screenPrice: 0, // стоимость всех экранов
	screenNumber: 0,
	servicePricesPercent: 0, // стоимость доп услуг %
	servicePricesNumber: 0, // стоимость доп услуг цена
	fullPrice: 0, // итоговая стоимость
	rollback: 0, // процент отката
	servicePercentPrice: 0, // стоимость с учетом отката

	// Инициализируем методы
	init: function () {
		appData.addTitle(); // Запуск при загрузке страницы
		startBtn.addEventListener('click', appData.checkAddScreens); // Запуск расчетов при нажатии на кнопку Рассчитать
		btnPlus.addEventListener('click', appData.addScreenBlock); // Запуск при нажатии на кнопку +
		inputRange.addEventListener('input', appData.getRollbackPercent);
	},

	addTitle: function () {
		document.title = title.textContent; // Заголовок страницы равен заголовку h1
	},

	// запускаем методы рассчета стоимости верстки
	start: function () {
		appData.addScreens(); // экраны
		appData.addServices(); // услуги
		appData.addPrices(); // расчеты
		appData.showResult(); // результаты
		// appData.logger();
	},

	// Итого
	showResult: function () {
		total.value = appData.screenPrice; // сумма верстки экранов
		totalCount.value = appData.screenNumber; // количество экранов
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber; // сумма доп услуг
		fullTotalCount.value = appData.fullPrice; // сумма верстки + доп
		totalCountRollback.value = appData.servicePercentPrice; // итог с учетом отката
	},

	// Результат проверки полей
	checkAddScreens: function () {
		if (appData.addScreens() === true) { // если при проверке полей возвращается true
			appData.start(); // запускаем расчеты
		} else {
			alert('Не заполнены поля'); // иначе алерт
		}
	},

	// добавляем в массив элементы с типом, количеством экранов и суммарной стоимостью
	addScreens: function () {
		appData.screens = [];

		screens = document.querySelectorAll('.screen'); // переопределяем переменную screens
		screens.forEach(function (screen, index) { // перебираем массив с
			const select = screen.querySelector('select'); // типы экранов
			const input = screen.querySelector('input'); // количество экранов
			const selectName = select.options[select.selectedIndex].textContent; // проверка на заполнение полей
			appData.screens.push({ // закидываем в массив элементы и указываем их
				id: index, // индекс
				name: selectName, // имя выбранного экрана
				count: +input.value, // количество экранов
				price: +select.value * +input.value // произведение цены экрана на количество
			});
		});

		// проверка полей на заполнение
		if (appData.screens.find(function (item) {
				return item.price == 0; // если найдется хоть одно значение price равное 0, а это будет значить что одно из полей не заполненно
			})) {
			return false; // позвращаем false
		} else {
			return true; //возвращаем true
		}
	},

	// добавляем новый блок с экранами
	addScreenBlock: function () {

		const cloneScreen = screens[0].cloneNode(true); // клонируем оригинал блока
		screens[screens.length - 1].after(cloneScreen); // вставляем клон после оригинала

	},

	// Добавляем дополнительные услуги
	addServices: function () {
		// перебираем коллекцию импутов с процентами
		otherItemsPercent.forEach(function (item) {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');

			if (check.checked) { // проверка чекбокса
				appData.servicesPercent[label.textContent] = +input.value; // передаем в объект servicesPercent значение инпутов  otherItemsPercent
			}
		});

		// перебираем коллекцию импутов с ценой/числами
		otherItemsNumber.forEach(function (item) {
			const check = item.querySelector('input[type="checkbox"]');
			const input = item.querySelector('input[type="text"]');
			const label = item.querySelector('label');

			if (check.checked) { // проверка чекбокса
				appData.servicesNumber[label.textContent] = +input.value; //передаем в объект servicesNumber значение инпутов  otherItemsNumber
			}
		});
	},

	// Делаем расчеты

	// перебираем элементы в массиве с экранами
	addPrices: function () {
		for (let screen of appData.screens) {
			appData.screenPrice += +screen.price; // суммируем стоимость всех типов экранов
		}
		// перебираем элементы в массиве с экранами
		for (let screen of appData.screens) {
			appData.screenNumber += +screen.count; // суммируем количество всех экранов
		}

		// перебираем доп услуги с ценой
		for (let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key]; // стоимость доп услуг с ценой
		}

		// перебираем доп услуги с процентами
		for (let key in appData.servicePercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100); // стоимость доп услуг %
		}

		appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesNumber; // итоговая стоимость

		appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100)); // стоимость с учетом отката

	},

	// Значение бегунка заноситься в свойство rollback
	getRollbackPercent: function () {
		inputRangeValue.textContent = inputRange.value + "%";
		appData.rollback = inputRange.value;

		totalCountRollback.value = Math.ceil(fullTotalCount.value - fullTotalCount.value * (appData.rollback / 100)); // изменение стоимости с учетом отката при изменении процента
	},

	logger: function () {
		console.log(appData.fullPrice);
		console.log(screens);
		console.log(appData.servicePercentPrice);
	}
};

appData.init();